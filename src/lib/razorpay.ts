import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Razorpay Server SDK Integration
 * CRITICAL SECURITY:
 * NEVER expose RAZORPAY_KEY_SECRET to client-side.
 * This module is STRICTLY server-only.
 */

let razorpayInstance: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      'Razorpay credentials missing. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.'
    );
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayInstance;
}

export interface CreateOrderParams {
  amountPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

/**
 * Creates a Razorpay order on Razorpay servers.
 * Amount MUST be in integer paise.
 */
export async function createRazorpayOrder(params: CreateOrderParams): Promise<RazorpayOrderResponse> {
  const rzp = getRazorpayClient();

  const options = {
    amount: params.amountPaise,
    currency: 'INR',
    receipt: params.receipt,
    payment_capture: 1, // Auto-capture payment upon successful authorization
    notes: params.notes || {},
  };

  const order = await rzp.orders.create(options);
  return order as unknown as RazorpayOrderResponse;
}

/**
 * Fetches the verified payment record directly from Razorpay's API.
 * Never trust client assertions alone.
 */
export async function fetchRazorpayPayment(paymentId: string) {
  const rzp = getRazorpayClient();
  const payment = await rzp.payments.fetch(paymentId);
  return payment as {
    id: string;
    order_id: string;
    status: string; // 'captured', 'authorized', 'failed', 'refunded'
    amount: number;
    currency: string;
    method: string;
    email?: string;
    contact?: string;
    captured?: boolean;
    error_code?: string | null;
    error_description?: string | null;
    created_at: number;
  };
}

/**
 * Cryptographically verifies Razorpay payment signature via HMAC-SHA256.
 * generated_signature = hmac_sha256(order_id + "|" + payment_id, secret)
 */
export function verifyPaymentSignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured on server.');
  }

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = params;
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return false;
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const actualBuffer = Buffer.from(razorpaySignature, 'utf8');

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

/**
 * Cryptographically verifies Razorpay Webhook signature against the raw request body.
 */
export function verifyWebhookSignature(params: {
  rawBody: string | Buffer;
  signature: string;
}): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn('[Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET is not configured.');
    return false;
  }

  const { rawBody, signature } = params;
  if (!rawBody || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8'))
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const actualBuffer = Buffer.from(signature, 'utf8');

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}
