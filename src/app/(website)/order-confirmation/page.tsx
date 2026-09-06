'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, ShieldCheck, MapPin, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    name: string;
    packSize: string;
    quantity: number;
    unitPricePaise: number;
    totalPricePaise: number;
    image: string;
  }>;
  subtotalPaise: number;
  shippingFeePaise: number;
  discountPaise: number;
  totalAmountPaise: number;
  currency: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const token = searchParams.get('token');

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !token) {
      setError('Invalid order reference or access token missing.');
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(orderId as string)}?token=${encodeURIComponent(token as string)}`);
        const data = await res.json();

        if (res.ok && data.success && data.order) {
          setOrder(data.order);
          // Trigger celebratory confetti once verified
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {}
        } else {
          setError(data.error || 'Unable to retrieve order details.');
        }
      } catch (err: any) {
        setError('Network error while retrieving order confirmation.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId, token]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(218, 165, 32, 0.2)', borderTopColor: 'var(--gold-accent, #D4AF37)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1.2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
          Verifying and loading order confirmation...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', color: '#FFF' }}>
        <AlertTriangle size={52} color="#EF4444" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFF' }}>Order Access Unavailable</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '420px', margin: '0.6rem 0 1.8rem' }}>
          {error || 'The requested order could not be found or access has expired.'}
        </p>
        <Link
          href="/shop"
          className="btn btn-primary"
          style={{ padding: '0.8rem 1.6rem', textDecoration: 'none', borderRadius: '8px' }}
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-scene, #06130E)', color: '#FFF', padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Success Header */}
        <div
          style={{
            textAlign: 'center',
            background: 'rgba(10, 24, 18, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(218, 165, 32, 0.3)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(74, 222, 128, 0.15)',
              border: '1px solid #4ADE80',
              marginBottom: '1rem',
            }}
          >
            <CheckCircle2 size={36} color="#4ADE80" />
          </div>

          <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.75rem', color: '#4ADE80', fontWeight: 700 }}>
            Payment Verified & Processed
          </span>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading, "Cormorant Garamond", serif)',
              margin: '0.4rem 0',
              color: 'var(--cream-silk, #FFFDF8)',
            }}
          >
            ORDER CONFIRMED
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Thank you for your order! Your CRUNIQUE order has been successfully placed.
          </p>

          <div
            style={{
              marginTop: '1.4rem',
              display: 'inline-block',
              background: 'rgba(218, 165, 32, 0.12)',
              border: '1px dashed var(--gold-accent, #D4AF37)',
              padding: '0.5rem 1.4rem',
              borderRadius: '9999px',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Order ID: </span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gold-bright, #E5C07B)' }}>
              #{order.orderNumber}
            </span>
          </div>
        </div>

        {/* Order Details & Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
          {/* Purchased Products */}
          <div
            style={{
              background: 'rgba(10, 24, 18, 0.65)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(218, 165, 32, 0.2)',
              borderRadius: '16px',
              padding: '1.8rem',
            }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--cream-silk, #FFF)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={18} color="var(--gold-accent, #D4AF37)" />
              Purchased Products
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img
                      src={item.image || '/assets/images/apple_chips.png'}
                      alt={item.name}
                      style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px', background: 'rgba(0,0,0,0.2)' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFF' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                        Quantity: {item.quantity} • {item.packSize}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--gold-accent, #D4AF37)' }}>
                    ₹{(item.totalPricePaise / 100).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.3rem' }}>
                <span>Subtotal</span>
                <span>₹{(order.subtotalPaise / 100).toFixed(0)}</span>
              </div>
              {order.discountPaise > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--gold-bright, #E5C07B)', marginBottom: '0.3rem' }}>
                  <span>Discount Applied</span>
                  <span>-₹{(order.discountPaise / 100).toFixed(0)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.3rem' }}>
                <span>Shipping Fee</span>
                <span>{order.shippingFeePaise === 0 ? 'FREE' : `₹${(order.shippingFeePaise / 100).toFixed(0)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--cream-silk, #FFF)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.6rem', marginTop: '0.4rem' }}>
                <span>Total Paid</span>
                <span>₹{(order.totalAmountPaise / 100).toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Shipping Address */}
            <div
              style={{
                background: 'rgba(10, 24, 18, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(218, 165, 32, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cream-silk, #FFF)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--gold-accent, #D4AF37)" />
                Shipping Destination
              </h3>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
                <div style={{ fontWeight: 600, color: '#FFF' }}>{order.customerName}</div>
                <div>{order.shippingAddress.addressLine1}</div>
                {order.shippingAddress.addressLine2 && <div>{order.shippingAddress.addressLine2}</div>}
                <div>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </div>
                <div>{order.shippingAddress.country}</div>
                <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                  Contact: {order.phone} • {order.email}
                </div>
              </div>
            </div>

            {/* Status & Delivery Timeline */}
            <div
              style={{
                background: 'rgba(10, 24, 18, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(218, 165, 32, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cream-silk, #FFF)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} color="var(--gold-accent, #D4AF37)" />
                Estimated Delivery
              </h3>
              <div style={{ fontSize: '0.92rem', color: '#4ADE80', fontWeight: 600, marginBottom: '0.4rem' }}>
                3-5 Business Days
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                Dispatched with Express Fragile Care directly from our family facility.
              </p>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                <ShieldCheck size={14} color="var(--gold-accent, #D4AF37)" />
                <span>Payment Status: <strong style={{ color: '#4ADE80' }}>{order.paymentStatus}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2.2rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #E5C07B 0%, #D4AF37 100%)',
              color: '#06130E',
              fontWeight: 800,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
