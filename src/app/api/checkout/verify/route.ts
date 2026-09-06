import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getSecureOrder,
  isPaymentIdAlreadyUsed,
  confirmOrderPayment,
  markOrderFailed,
} from '@/lib/order-service';
import { verifyPaymentSignature, fetchRazorpayPayment } from '@/lib/razorpay';

const verifySchema = z.object({
  orderNumber: z.string().trim().min(5),
  orderAccessToken: z.string().trim().min(16),
  razorpayOrderId: z.string().trim().min(5),
  razorpayPaymentId: z.string().trim().min(5),
  razorpaySignature: z.string().trim().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification payload' },
        { status: 400 }
      );
    }

    const {
      orderNumber,
      orderAccessToken,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = parsed.data;

    // 1. Authorize access & fetch order safely
    const order = await getSecureOrder(orderNumber, orderAccessToken);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized or invalid order reference.' },
        { status: 403 }
      );
    }

    // 2. Idempotent check: If already paid, return success directly
    if (order.paymentStatus === 'PAID') {
      return NextResponse.json({
        success: true,
        orderNumber: order.orderNumber,
        orderAccessToken: order.orderAccessToken,
        status: 'PAID',
        message: 'Order was already verified and confirmed.',
      });
    }

    // 3. Verify Razorpay Order ID matches CRUNIQUE order
    if (order.razorpayOrderId && order.razorpayOrderId !== razorpayOrderId) {
      console.error(
        `[Payment Verification Mismatch] Order ${orderNumber} expected ${order.razorpayOrderId}, got ${razorpayOrderId}`
      );
      await markOrderFailed(orderNumber, 'Razorpay order ID mismatch');
      return NextResponse.json(
        { success: false, error: 'Payment verification failed: Order reference mismatch.' },
        { status: 400 }
      );
    }

    // 4. Payment Replay Protection: Ensure payment ID hasn't been used on another order
    const isReplay = await isPaymentIdAlreadyUsed(razorpayPaymentId, orderNumber);
    if (isReplay) {
      console.error(
        `[Payment Replay Attempt] Payment ID ${razorpayPaymentId} already used for another order.`
      );
      return NextResponse.json(
        { success: false, error: 'Payment token has already been claimed.' },
        { status: 400 }
      );
    }

    // 5. Cryptographic Signature Verification
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const hasLiveKeys = Boolean(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
      keySecret &&
      !keySecret.includes('your_razorpay_key_secret')
    );

    let paymentDetails: any = null;

    if (hasLiveKeys) {
      const isSignatureValid = verifyPaymentSignature({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });

      if (!isSignatureValid) {
        console.error(`[Signature Verification Failed] for order ${orderNumber}`);
        await markOrderFailed(orderNumber, 'HMAC signature invalid');
        return NextResponse.json(
          { success: false, error: 'Payment verification failed: Cryptographic signature mismatch.' },
          { status: 400 }
        );
      }

      // 6. Direct Razorpay API Verification
      try {
        const payment = await fetchRazorpayPayment(razorpayPaymentId);
        paymentDetails = payment;

        // Verify currency
        if (payment.currency !== 'INR') {
          console.error(`[Currency Mismatch] Expected INR, got ${payment.currency}`);
          await markOrderFailed(orderNumber, 'Currency mismatch');
          return NextResponse.json(
            { success: false, error: 'Payment verification failed: Invalid currency.' },
            { status: 400 }
          );
        }

        // Verify amount in integer paise
        if (payment.amount !== order.totalAmountPaise) {
          console.error(
            `[Amount Mismatch] Expected ${order.totalAmountPaise} paise, got ${payment.amount} paise`
          );
          await markOrderFailed(orderNumber, 'Amount mismatch');
          return NextResponse.json(
            { success: false, error: 'Payment verification failed: Amount discrepancy.' },
            { status: 400 }
          );
        }

        // Verify order_id linkage
        if (payment.order_id && payment.order_id !== razorpayOrderId) {
          console.error(
            `[Payment Order Mismatch] Payment belongs to ${payment.order_id}, not ${razorpayOrderId}`
          );
          await markOrderFailed(orderNumber, 'Payment order mismatch');
          return NextResponse.json(
            { success: false, error: 'Payment verification failed: Payment linked to different order.' },
            { status: 400 }
          );
        }

        // Verify payment status
        if (payment.status !== 'captured' && payment.status !== 'authorized') {
          console.error(`[Payment Status Unsuccessful] Status is ${payment.status}`);
          await markOrderFailed(orderNumber, `Unsuccessful status: ${payment.status}`);
          return NextResponse.json(
            { success: false, error: 'Payment was not successfully captured.' },
            { status: 400 }
          );
        }
      } catch (apiErr: any) {
        console.error('[Razorpay API Fetch Error]:', apiErr);
        return NextResponse.json(
          { success: false, error: 'Unable to communicate with payment gateway to verify status.' },
          { status: 502 }
        );
      }
    } else {
      // Local dev simulation fallback when developer keys are placeholder
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { success: false, error: 'Payment configuration invalid in production.' },
          { status: 500 }
        );
      }
      paymentDetails = {
        id: razorpayPaymentId,
        status: 'captured',
        amount: order.totalAmountPaise,
        currency: 'INR',
        method: 'test_simulation',
      };
    }

    // 7. Controlled Status Transition: PENDING -> PAID -> CONFIRMED
    const updatedOrder = await confirmOrderPayment({
      orderNumber,
      razorpayPaymentId,
      razorpayOrderId,
      transactionDetails: paymentDetails,
    });

    return NextResponse.json({
      success: true,
      orderNumber: updatedOrder.orderNumber,
      orderAccessToken: updatedOrder.orderAccessToken,
      status: 'PAID',
    });
  } catch (error: any) {
    console.error('[Verify Route Handler Error]:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred during verification.' },
      { status: 500 }
    );
  }
}
