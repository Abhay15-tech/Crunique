import { NextRequest, NextResponse } from 'next/server';
import { getSecureOrder } from '@/lib/order-service';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await context.params;
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Forbidden: Access token required to view order details.' },
        { status: 403 }
      );
    }

    // Cryptographic token authorization check
    const order = await getSecureOrder(orderId, token);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or unauthorized token.' },
        { status: 403 }
      );
    }

    // Return strictly sanitized customer-safe order view
    const safeOrder = {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      shippingAddress: order.shippingAddress,
      items: order.itemsSnapshot,
      subtotalPaise: order.subtotalPaise,
      shippingFeePaise: order.shippingFeePaise,
      discountPaise: order.discountPaise,
      totalAmountPaise: order.totalAmountPaise,
      currency: order.currency,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
    };

    return NextResponse.json({
      success: true,
      order: safeOrder,
    });
  } catch (error: any) {
    console.error('[Get Order API Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
