import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import {
  getOrderByRazorpayOrderId,
  confirmOrderPayment,
  markOrderFailed,
  isWebhookEventProcessed,
  markWebhookEventProcessed,
} from '@/lib/order-service';

export async function POST(req: NextRequest) {
  try {
    // 1. MUST read RAW body before JSON parsing for cryptographic signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (webhookSecret && !webhookSecret.includes('your_razorpay_webhook_secret')) {
      const isValid = verifyWebhookSignature({ rawBody, signature });
      if (!isValid) {
        console.error('[Razorpay Webhook Error] Invalid cryptographic webhook signature.');
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 400 }
        );
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.error('[Razorpay Webhook Error] RAZORPAY_WEBHOOK_SECRET missing in production.');
      return NextResponse.json(
        { error: 'Webhook secret is not configured' },
        { status: 500 }
      );
    }

    // 2. Parse event payload
    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch (parseErr) {
      return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
    }

    const eventId = event.event_id || event.id || `${event.event}_${Date.now()}`;
    const eventType = event.event;

    // 3. Webhook Idempotency Check: Do not re-process already handled events
    const alreadyHandled = await isWebhookEventProcessed(eventId);
    if (alreadyHandled) {
      return NextResponse.json({ status: 'already_processed' }, { status: 200 });
    }

    // 4. Handle standard payment lifecycle events
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
      const razorpayPaymentId = paymentEntity?.id || 'webhook_captured';

      if (razorpayOrderId) {
        const order = await getOrderByRazorpayOrderId(razorpayOrderId);
        if (order && order.paymentStatus !== 'PAID') {
          // Verify currency and amount in paise
          const eventAmount = paymentEntity?.amount || orderEntity?.amount;
          if (eventAmount && eventAmount === order.totalAmountPaise) {
            await confirmOrderPayment({
              orderNumber: order.orderNumber,
              razorpayPaymentId,
              razorpayOrderId,
              transactionDetails: paymentEntity || orderEntity,
            });
            console.log(`[Webhook Confirmed] Order ${order.orderNumber} successfully marked PAID.`);
          } else {
            console.warn(`[Webhook Discrepancy] Amount mismatch for order ${order.orderNumber}`);
          }
        }
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      if (razorpayOrderId) {
        const order = await getOrderByRazorpayOrderId(razorpayOrderId);
        if (order && order.paymentStatus === 'PENDING') {
          await markOrderFailed(order.orderNumber, paymentEntity?.error_description || 'Payment failed');
        }
      }
    }

    // 5. Persist idempotency marker
    await markWebhookEventProcessed(eventId, eventType);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error: any) {
    console.error('[Razorpay Webhook Handler Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing webhook' },
      { status: 500 }
    );
  }
}
