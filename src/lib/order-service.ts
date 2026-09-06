import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { db } from './db';
import { ValidatedOrderItem } from './pricing';

export interface ShippingAddressInput {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface StoredOrder {
  id: string;
  orderNumber: string;
  orderAccessToken: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: ShippingAddressInput;
  itemsSnapshot: ValidatedOrderItem[];
  subtotalPaise: number;
  shippingFeePaise: number;
  discountPaise: number;
  totalAmountPaise: number;
  currency: 'INR';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus: 'PLACED' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Local Dev fallback store path (Strictly isolated to non-production dev when DATABASE_URL is not set)
const DEV_STORE_DIR = path.join(process.cwd(), 'data');
const DEV_STORE_FILE = path.join(DEV_STORE_DIR, 'orders.json');
const DEV_WEBHOOK_FILE = path.join(DEV_STORE_DIR, 'webhooks.json');

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '');
}

/**
 * Ensures dev fallback data files exist (strictly for non-production development)
 */
function ensureDevStoreFiles() {
  if (!fs.existsSync(DEV_STORE_DIR)) {
    fs.mkdirSync(DEV_STORE_DIR, { recursive: true });
  }
  if (!fs.existsSync(DEV_STORE_FILE)) {
    fs.writeFileSync(DEV_STORE_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
  if (!fs.existsSync(DEV_WEBHOOK_FILE)) {
    fs.writeFileSync(DEV_WEBHOOK_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readDevOrders(): StoredOrder[] {
  ensureDevStoreFiles();
  try {
    const raw = fs.readFileSync(DEV_STORE_FILE, 'utf-8');
    return JSON.parse(raw) || [];
  } catch (e) {
    return [];
  }
}

function writeDevOrders(orders: StoredOrder[]) {
  ensureDevStoreFiles();
  fs.writeFileSync(DEV_STORE_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

/**
 * Generates an official CRUNIQUE Order Number.
 * Example: CRQ-260906-8A4F
 */
export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randHex = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `CRQ-${dateStr}-${randHex}`;
}

/**
 * Generates a cryptographically secure 256-bit token for authorized order confirmation access.
 * Prevents IDOR (Insecure Direct Object Reference) vulnerabilities.
 */
export function generateOrderAccessToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Creates a pending order in the database.
 * Strictly adheres to production PostgreSQL requirements.
 */
export async function createPendingOrder(params: {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: ShippingAddressInput;
  itemsSnapshot: ValidatedOrderItem[];
  subtotalPaise: number;
  shippingFeePaise: number;
  discountPaise: number;
  totalAmountPaise: number;
  razorpayOrderId?: string;
  userId?: string | null;
}): Promise<{ order: StoredOrder; orderAccessToken: string }> {
  const orderNumber = generateOrderNumber();
  const orderAccessToken = generateOrderAccessToken();
  const nowIso = new Date().toISOString();

  const newOrder: StoredOrder = {
    id: `ord_${crypto.randomBytes(8).toString('hex')}`,
    orderNumber,
    orderAccessToken,
    razorpayOrderId: params.razorpayOrderId || null,
    razorpayPaymentId: null,
    customerName: params.customerName.trim(),
    email: params.email.trim().toLowerCase(),
    phone: params.phone.trim(),
    shippingAddress: params.shippingAddress,
    itemsSnapshot: params.itemsSnapshot,
    subtotalPaise: params.subtotalPaise,
    shippingFeePaise: params.shippingFeePaise,
    discountPaise: params.discountPaise,
    totalAmountPaise: params.totalAmountPaise,
    currency: 'INR',
    paymentStatus: 'PENDING',
    orderStatus: 'PLACED',
    userId: params.userId || null,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  // Production requirement: Must use PostgreSQL via Prisma
  if (isProduction()) {
    if (!hasDatabaseUrl()) {
      throw new Error(
        '[CRUNIQUE Production Error] DATABASE_URL is not configured in production. Order creation refused.'
      );
    }

    try {
      const created = await db.order.create({
        data: {
          id: newOrder.id,
          orderNumber: newOrder.orderNumber,
          orderAccessToken: newOrder.orderAccessToken,
          razorpayOrderId: newOrder.razorpayOrderId,
          razorpayPaymentId: null,
          customerName: newOrder.customerName,
          email: newOrder.email,
          phone: newOrder.phone,
          shippingAddress: newOrder.shippingAddress as any,
          itemsSnapshot: newOrder.itemsSnapshot as any,
          subtotalPaise: newOrder.subtotalPaise,
          shippingFeePaise: newOrder.shippingFeePaise,
          discountPaise: newOrder.discountPaise,
          totalAmountPaise: newOrder.totalAmountPaise,
          currency: 'INR',
          paymentStatus: 'PENDING',
          status: 'PENDING',
          userId: newOrder.userId || null,
        },
      });

      return {
        order: {
          ...newOrder,
          id: created.id,
          createdAt: created.createdAt.toISOString(),
          updatedAt: created.updatedAt.toISOString(),
        },
        orderAccessToken,
      };
    } catch (dbError: any) {
      console.error('[CRUNIQUE DB Error in Production]:', dbError);
      throw new Error('Database connection failed in production. Order cannot be saved.');
    }
  }

  // Non-production Development: Use Prisma if configured, else isolated dev fallback
  if (hasDatabaseUrl()) {
    try {
      const created = await db.order.create({
        data: {
          id: newOrder.id,
          orderNumber: newOrder.orderNumber,
          orderAccessToken: newOrder.orderAccessToken,
          razorpayOrderId: newOrder.razorpayOrderId,
          razorpayPaymentId: null,
          customerName: newOrder.customerName,
          email: newOrder.email,
          phone: newOrder.phone,
          shippingAddress: newOrder.shippingAddress as any,
          itemsSnapshot: newOrder.itemsSnapshot as any,
          subtotalPaise: newOrder.subtotalPaise,
          shippingFeePaise: newOrder.shippingFeePaise,
          discountPaise: newOrder.discountPaise,
          totalAmountPaise: newOrder.totalAmountPaise,
          currency: 'INR',
          paymentStatus: 'PENDING',
          status: 'PENDING',
          userId: newOrder.userId || null,
        },
      });

      return {
        order: {
          ...newOrder,
          id: created.id,
          createdAt: created.createdAt.toISOString(),
          updatedAt: created.updatedAt.toISOString(),
        },
        orderAccessToken,
      };
    } catch (devDbError) {
      console.warn('[Dev Notice] Prisma database unreachable, using local dev mock:', devDbError);
    }
  }

  // Fallback solely for offline local development without Postgres
  const orders = readDevOrders();
  orders.unshift(newOrder);
  writeDevOrders(orders);

  return {
    order: newOrder,
    orderAccessToken,
  };
}

/**
 * Finds an order by its Razorpay Order ID.
 */
export async function getOrderByRazorpayOrderId(razorpayOrderId: string): Promise<StoredOrder | null> {
  if (isProduction() || hasDatabaseUrl()) {
    try {
      const found = await db.order.findUnique({
        where: { razorpayOrderId },
      });
      if (found) {
        return {
          id: found.id,
          orderNumber: found.orderNumber,
          orderAccessToken: found.orderAccessToken,
          razorpayOrderId: found.razorpayOrderId,
          razorpayPaymentId: found.razorpayPaymentId,
          customerName: found.customerName,
          email: found.email,
          phone: found.phone,
          shippingAddress: found.shippingAddress as any,
          itemsSnapshot: found.itemsSnapshot as any,
          subtotalPaise: found.subtotalPaise,
          shippingFeePaise: found.shippingFeePaise,
          discountPaise: found.discountPaise,
          totalAmountPaise: found.totalAmountPaise,
          currency: 'INR',
          paymentStatus: found.paymentStatus as any,
          orderStatus: (found.status === 'CONFIRMED' ? 'CONFIRMED' : 'PLACED') as any,
          userId: found.userId,
          createdAt: found.createdAt.toISOString(),
          updatedAt: found.updatedAt.toISOString(),
        };
      }
      if (isProduction()) return null;
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  // Dev fallback
  const orders = readDevOrders();
  return orders.find((o) => o.razorpayOrderId === razorpayOrderId) || null;
}

/**
 * Finds an order by its CRUNIQUE Order Number.
 */
export async function getOrderByOrderNumber(orderNumber: string): Promise<StoredOrder | null> {
  if (isProduction() || hasDatabaseUrl()) {
    try {
      const found = await db.order.findUnique({
        where: { orderNumber },
      });
      if (found) {
        return {
          id: found.id,
          orderNumber: found.orderNumber,
          orderAccessToken: found.orderAccessToken,
          razorpayOrderId: found.razorpayOrderId,
          razorpayPaymentId: found.razorpayPaymentId,
          customerName: found.customerName,
          email: found.email,
          phone: found.phone,
          shippingAddress: found.shippingAddress as any,
          itemsSnapshot: found.itemsSnapshot as any,
          subtotalPaise: found.subtotalPaise,
          shippingFeePaise: found.shippingFeePaise,
          discountPaise: found.discountPaise,
          totalAmountPaise: found.totalAmountPaise,
          currency: 'INR',
          paymentStatus: found.paymentStatus as any,
          orderStatus: (found.status === 'CONFIRMED' ? 'CONFIRMED' : 'PLACED') as any,
          userId: found.userId,
          createdAt: found.createdAt.toISOString(),
          updatedAt: found.updatedAt.toISOString(),
        };
      }
      if (isProduction()) return null;
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  // Dev fallback
  const orders = readDevOrders();
  return orders.find((o) => o.orderNumber === orderNumber) || null;
}

/**
 * Checks if a payment ID has already been registered on another CRUNIQUE order.
 * Replay protection.
 */
export async function isPaymentIdAlreadyUsed(paymentId: string, currentOrderNumber?: string): Promise<boolean> {
  if (isProduction() || hasDatabaseUrl()) {
    try {
      const existing = await db.order.findUnique({
        where: { razorpayPaymentId: paymentId },
      });
      if (existing) {
        return existing.orderNumber !== currentOrderNumber;
      }
      return false;
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  const orders = readDevOrders();
  const existing = orders.find((o) => o.razorpayPaymentId === paymentId);
  return existing ? existing.orderNumber !== currentOrderNumber : false;
}

/**
 * Marks order as verified and confirmed.
 * Transition: PENDING -> PAID -> CONFIRMED
 */
export async function confirmOrderPayment(params: {
  orderNumber: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  transactionDetails?: any;
}): Promise<StoredOrder> {
  const { orderNumber, razorpayPaymentId, razorpayOrderId, transactionDetails } = params;
  const now = new Date();
  const nowIso = now.toISOString();

  if (isProduction() || hasDatabaseUrl()) {
    try {
      const updated = await db.$transaction(async (tx) => {
        // Re-check order status within transaction
        const target = await tx.order.findUnique({
          where: { orderNumber },
        });

        if (!target) {
          throw new Error(`Order ${orderNumber} not found.`);
        }

        if (target.paymentStatus === 'PAID') {
          return target; // Idempotent return
        }

        // Update Order
        const orderUpdated = await tx.order.update({
          where: { orderNumber },
          data: {
            razorpayPaymentId,
            razorpayOrderId,
            paymentStatus: 'PAID',
            status: 'CONFIRMED',
            updatedAt: now,
          },
        });

        // Upsert Payment record
        await tx.payment.upsert({
          where: { orderId: target.id },
          create: {
            orderId: target.id,
            paymentId: razorpayPaymentId,
            amountPaise: target.totalAmountPaise,
            status: 'PAID',
            method: 'RAZORPAY',
            transactionDetails: transactionDetails || {},
          },
          update: {
            paymentId: razorpayPaymentId,
            status: 'PAID',
            transactionDetails: transactionDetails || {},
          },
        });

        return orderUpdated;
      });

      return {
        id: updated.id,
        orderNumber: updated.orderNumber,
        orderAccessToken: updated.orderAccessToken,
        razorpayOrderId: updated.razorpayOrderId,
        razorpayPaymentId: updated.razorpayPaymentId,
        customerName: updated.customerName,
        email: updated.email,
        phone: updated.phone,
        shippingAddress: updated.shippingAddress as any,
        itemsSnapshot: updated.itemsSnapshot as any,
        subtotalPaise: updated.subtotalPaise,
        shippingFeePaise: updated.shippingFeePaise,
        discountPaise: updated.discountPaise,
        totalAmountPaise: updated.totalAmountPaise,
        currency: 'INR',
        paymentStatus: 'PAID',
        orderStatus: 'CONFIRMED',
        userId: updated.userId,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  // Dev fallback
  const orders = readDevOrders();
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx === -1) {
    throw new Error(`Order ${orderNumber} not found in store.`);
  }

  orders[idx].razorpayPaymentId = razorpayPaymentId;
  orders[idx].razorpayOrderId = razorpayOrderId;
  orders[idx].paymentStatus = 'PAID';
  orders[idx].orderStatus = 'CONFIRMED';
  orders[idx].updatedAt = nowIso;
  writeDevOrders(orders);

  return orders[idx];
}

/**
 * Marks order as FAILED.
 */
export async function markOrderFailed(orderNumber: string, reason?: string): Promise<void> {
  if (isProduction() || hasDatabaseUrl()) {
    try {
      await db.order.update({
        where: { orderNumber },
        data: {
          paymentStatus: 'FAILED',
          status: 'CANCELLED',
        },
      });
      return;
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  const orders = readDevOrders();
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx > -1) {
    orders[idx].paymentStatus = 'FAILED';
    orders[idx].orderStatus = 'CANCELLED';
    writeDevOrders(orders);
  }
}

/**
 * Authorizes customer access to order confirmation.
 * Strictly verifies `token === order.orderAccessToken`.
 * Prevents unauthorized snooping of other customers' orders.
 */
export async function getSecureOrder(
  orderNumber: string,
  token: string | null
): Promise<StoredOrder | null> {
  if (!token) return null;

  const order = await getOrderByOrderNumber(orderNumber);
  if (!order) return null;

  // Cryptographic constant-time comparison to prevent timing attacks
  const expectedBuf = Buffer.from(order.orderAccessToken, 'utf8');
  const actualBuf = Buffer.from(token, 'utf8');

  if (expectedBuf.length !== actualBuf.length || !crypto.timingSafeEqual(expectedBuf, actualBuf)) {
    return null;
  }

  return order;
}

/**
 * Webhook Idempotency: Checks if an event ID has already been handled.
 */
export async function isWebhookEventProcessed(eventId: string): Promise<boolean> {
  if (isProduction() || hasDatabaseUrl()) {
    try {
      const found = await db.processedWebhookEvent.findUnique({
        where: { id: eventId },
      });
      return Boolean(found);
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  ensureDevStoreFiles();
  try {
    const raw = fs.readFileSync(DEV_WEBHOOK_FILE, 'utf-8');
    const events: string[] = JSON.parse(raw) || [];
    return events.includes(eventId);
  } catch (e) {
    return false;
  }
}

/**
 * Webhook Idempotency: Records an event ID as processed.
 */
export async function markWebhookEventProcessed(eventId: string, eventType: string): Promise<void> {
  if (isProduction() || hasDatabaseUrl()) {
    try {
      await db.processedWebhookEvent.create({
        data: {
          id: eventId,
          eventType,
        },
      });
      return;
    } catch (e) {
      if (isProduction()) throw e;
    }
  }

  ensureDevStoreFiles();
  try {
    const raw = fs.readFileSync(DEV_WEBHOOK_FILE, 'utf-8');
    const events: string[] = JSON.parse(raw) || [];
    if (!events.includes(eventId)) {
      events.push(eventId);
      fs.writeFileSync(DEV_WEBHOOK_FILE, JSON.stringify(events, null, 2), 'utf-8');
    }
  } catch (e) {}
}
