import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateServerCartPricing } from '@/lib/pricing';
import { createRazorpayOrder } from '@/lib/razorpay';
import { createPendingOrder } from '@/lib/order-service';

const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, 'Full Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(10, 'Mobile Number must be at least 10 digits'),
  shippingAddress: z.object({
    addressLine1: z.string().trim().min(3, 'Address Line 1 is required'),
    addressLine2: z.string().trim().optional(),
    city: z.string().trim().min(2, 'City is required'),
    state: z.string().trim().min(2, 'State is required'),
    pincode: z.string().trim().regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
    country: z.string().trim().default('India'),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      packSize: z.string().optional(),
      quantity: z.number().int().min(1).max(50),
    })
  ).min(1, 'Cart cannot be empty'),
  promoCode: z.string().trim().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { customerName, email, phone, shippingAddress, items, promoCode } = parsed.data;

    // 1. Authoritatively calculate prices on server (INR integer paise)
    const pricing = calculateServerCartPricing(items, promoCode);

    // 2. Prepare receipt identifier
    const timestamp = Date.now().toString().slice(-6);
    const receipt = `rcpt_${timestamp}`;

    let razorpayOrderId = '';
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

    // 3. Create Razorpay order via SDK
    if (keyId && keySecret && !keyId.includes('your_key_id')) {
      try {
        const rzpOrder = await createRazorpayOrder({
          amountPaise: pricing.totalAmountPaise,
          receipt,
          notes: {
            customerName,
            email,
            itemCount: String(pricing.itemCount),
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (rzpErr: any) {
        console.error('[Razorpay Order Creation Error]:', rzpErr);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to initialize payment with gateway. Please check your credentials or try again.',
          },
          { status: 502 }
        );
      }
    } else {
      // In local dev without live keys: generate dev order id for test execution
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error: 'Payment gateway configuration is incomplete on the server.',
          },
          { status: 500 }
        );
      }
      razorpayOrderId = `order_dev_${Date.now()}`;
    }

    // 4. Persist pending order to database
    const { order, orderAccessToken } = await createPendingOrder({
      customerName,
      email,
      phone,
      shippingAddress: {
        fullName: customerName,
        email,
        phone,
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        country: shippingAddress.country || 'India',
      },
      itemsSnapshot: pricing.items,
      subtotalPaise: pricing.subtotalPaise,
      shippingFeePaise: pricing.shippingFeePaise,
      discountPaise: pricing.discountPaise,
      totalAmountPaise: pricing.totalAmountPaise,
      razorpayOrderId,
    });

    // 5. Return safe client response
    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderAccessToken,
      razorpayOrderId,
      amountPaise: pricing.totalAmountPaise,
      currency: 'INR',
      keyId,
      customer: {
        name: customerName,
        email,
        phone,
      },
    });
  } catch (error: any) {
    console.error('[Create Order Handler Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred while creating your order.',
      },
      { status: 500 }
    );
  }
}
