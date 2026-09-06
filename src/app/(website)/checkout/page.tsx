'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Dynamically inject official Razorpay checkout script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { cart, clearCart } = useApp();

  // Customer details form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Loading & payment states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertNotice, setAlertNotice] = useState<{ type: 'error' | 'warning' | 'info'; message: string } | null>(null);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // Standard item mapping with INR paise prices
  const validCartItems = (cart || []).filter((item: any) => item && item.product);

  // Approximate live client subtotal for initial preview (server recalculates authoritatively)
  const clientSubtotal = validCartItems.reduce((sum: number, item: any) => {
    const p = item.product;
    // Map dollar prices to standard ₹199 base if needed
    const inrPrice = p.priceInr || (p.price > 20 ? p.price : 199);
    return sum + inrPrice * (item.quantity || 1);
  }, 0);

  const discountAmount = appliedPromo === 'FAMILY15' ? Math.round(clientSubtotal * 0.15) : 0;
  const shippingFee = clientSubtotal - discountAmount >= 499 || validCartItems.length === 0 ? 0 : 49;
  const estimatedTotal = Math.max(0, clientSubtotal - discountAmount + shippingFee);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FAMILY15') {
      setAppliedPromo('FAMILY15');
      setAlertNotice(null);
    } else {
      setAlertNotice({ type: 'warning', message: "Invalid promo code. Try 'FAMILY15' for 15% off!" });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.addressLine1.trim() || formData.addressLine1.trim().length < 4) {
      errors.addressLine1 = 'Please enter street address';
    }
    if (!formData.city.trim()) {
      errors.city = 'Please enter city';
    }
    if (!formData.state.trim()) {
      errors.state = 'Please enter state';
    }
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      errors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = async () => {
    if (isSubmitting) return; // Duplicate click prevention

    if (validCartItems.length === 0) {
      setAlertNotice({ type: 'warning', message: 'Your cart is empty. Please add products to checkout.' });
      return;
    }

    if (!validateForm()) {
      setAlertNotice({ type: 'warning', message: 'Please complete all required shipping fields marked below.' });
      return;
    }

    setIsSubmitting(true);
    setAlertNotice(null);

    try {
      // 1. Prepare items payload
      const orderItems = validCartItems.map((item: any) => ({
        productId: item.product.id || 'apple-chips',
        packSize: item.product.packSize || '50g',
        quantity: item.quantity || 1,
      }));

      // 2. Call server to validate cart and create Razorpay order
      const createRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: {
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
          },
          items: orderItems,
          promoCode: appliedPromo,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok || !createData.success) {
        throw new Error(createData.error || 'Failed to initialize order on server');
      }

      const { orderNumber, orderAccessToken, razorpayOrderId, amountPaise, currency, keyId } = createData;

      // 3. Ensure Razorpay script loaded
      const scriptReady = await loadRazorpayScript();
      const hasRazorpayWindow = Boolean((window as any).Razorpay);

      // In environment where Razorpay SDK keys are test/placeholder, or window.Razorpay available
      if (hasRazorpayWindow && keyId && !keyId.includes('your_key_id')) {
        const options = {
          key: keyId,
          amount: amountPaise,
          currency: currency || 'INR',
          name: 'CRUNIQUE',
          description: 'Luxury Real Fruit Chips',
          image: '/assets/images/crunique_logo.jpg',
          order_id: razorpayOrderId,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#0A2E20',
          },
          modal: {
            ondismiss: () => {
              setIsSubmitting(false);
              setAlertNotice({
                type: 'warning',
                message: 'Payment was cancelled. Your cart is still saved.',
              });
            },
          },
          handler: async (response: any) => {
            // Received response from Razorpay: verify on server!
            try {
              const verifyRes = await fetch('/api/checkout/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderNumber,
                  orderAccessToken,
                  razorpayOrderId: response.razorpay_order_id || razorpayOrderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                // Clear cart only after verified confirmation!
                clearCart();
                window.location.href = `/order-confirmation?orderId=${encodeURIComponent(orderNumber)}&token=${encodeURIComponent(orderAccessToken)}`;
              } else {
                setIsSubmitting(false);
                setAlertNotice({
                  type: 'error',
                  message: verifyData.error || 'Payment verification could not be completed. Please contact concierge.',
                });
              }
            } catch (vErr: any) {
              setIsSubmitting(false);
              setAlertNotice({
                type: 'error',
                message: 'Error verifying payment signature. Please try again.',
              });
            }
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (errResponse: any) => {
          setIsSubmitting(false);
          setAlertNotice({
            type: 'error',
            message: errResponse.error?.description || 'Payment could not be completed. Please try again.',
          });
        });
        rzp.open();
      } else {
        // Safe Test Mode Simulator for local verification without active Razorpay merchant dashboard keys
        console.log('[CRUNIQUE Test Mode] Simulating Razorpay checkout flow...');
        const simulatedPaymentId = `pay_test_${Date.now()}`;
        const simulatedSignature = `sig_test_${Date.now()}`;

        const verifyRes = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderNumber,
            orderAccessToken,
            razorpayOrderId,
            razorpayPaymentId: simulatedPaymentId,
            razorpaySignature: simulatedSignature,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          clearCart();
          window.location.href = `/order-confirmation?orderId=${encodeURIComponent(orderNumber)}&token=${encodeURIComponent(orderAccessToken)}`;
        } else {
          setIsSubmitting(false);
          setAlertNotice({
            type: 'error',
            message: verifyData.error || 'Payment verification failed.',
          });
        }
      }
    } catch (err: any) {
      console.error('[Checkout Error]:', err);
      setIsSubmitting(false);
      setAlertNotice({
        type: 'error',
        message: err.message || 'Payment could not be completed. Please try again.',
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-scene, #06130E)', color: '#FFF', padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* Back navigation */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--gold-accent, #D4AF37)',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> Back to Shop
          </Link>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '0.75rem',
              color: 'var(--gold-bright, #E5C07B)',
              fontWeight: 600,
            }}
          >
            Secure Checkout
          </span>
          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading, "Cormorant Garamond", serif)',
              margin: '0.3rem 0',
              color: 'var(--cream-silk, #FFFDF8)',
            }}
          >
            Complete Your CRUNIQUE Order
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem' }}>
            Made with Real Fruit • From our family to yours.
          </p>
        </div>

        {/* Dynamic Alert Banner */}
        {alertNotice && (
          <div
            style={{
              marginBottom: '2rem',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background:
                alertNotice.type === 'error'
                  ? 'rgba(214, 40, 40, 0.15)'
                  : alertNotice.type === 'warning'
                  ? 'rgba(244, 196, 48, 0.15)'
                  : 'rgba(74, 222, 128, 0.15)',
              border: `1px solid ${
                alertNotice.type === 'error'
                  ? 'rgba(214, 40, 40, 0.4)'
                  : alertNotice.type === 'warning'
                  ? 'rgba(244, 196, 48, 0.4)'
                  : 'rgba(74, 222, 128, 0.4)'
              }`,
              color: '#FFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle
                size={20}
                color={
                  alertNotice.type === 'error'
                    ? '#EF4444'
                    : alertNotice.type === 'warning'
                    ? '#FBBF24'
                    : '#4ADE80'
                }
              />
              <span style={{ fontSize: '0.92rem' }}>{alertNotice.message}</span>
            </div>
            {alertNotice.type === 'warning' && (
              <button
                onClick={() => setAlertNotice(null)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFF',
                  borderRadius: '9999px',
                  padding: '0.3rem 0.8rem',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* LEFT: Customer & Shipping Forms */}
          <div>
            {/* 1. Customer Information */}
            <div
              style={{
                background: 'rgba(10, 24, 18, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(218, 165, 32, 0.2)',
                borderRadius: '16px',
                padding: '1.8rem',
                marginBottom: '1.8rem',
              }}
            >
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream-silk, #FFF)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--gold-accent, #D4AF37)', color: '#06130E', fontSize: '0.85rem', fontWeight: 800 }}>1</span>
                Customer Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Abhay Sharma"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1px solid ${formErrors.fullName ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                      background: 'rgba(0,0,0,0.35)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                  {formErrors.fullName && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.fullName}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="abhay@example.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: `1px solid ${formErrors.email ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                        background: 'rgba(0,0,0,0.35)',
                        color: '#FFF',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                    />
                    {formErrors.email && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.email}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      maxLength={10}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: `1px solid ${formErrors.phone ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                        background: 'rgba(0,0,0,0.35)',
                        color: '#FFF',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                    />
                    {formErrors.phone && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.phone}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div
              style={{
                background: 'rgba(10, 24, 18, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(218, 165, 32, 0.2)',
                borderRadius: '16px',
                padding: '1.8rem',
              }}
            >
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream-silk, #FFF)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--gold-accent, #D4AF37)', color: '#06130E', fontSize: '0.85rem', fontWeight: 800 }}>2</span>
                Shipping Address
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Apartment, Street"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1px solid ${formErrors.addressLine1 ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                      background: 'rgba(0,0,0,0.35)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                  {formErrors.addressLine1 && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.addressLine1}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Landmark, Area, Sector"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(0,0,0,0.35)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: `1px solid ${formErrors.city ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                        background: 'rgba(0,0,0,0.35)',
                        color: '#FFF',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                    />
                    {formErrors.city && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.city}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: `1px solid ${formErrors.state ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                        background: 'rgba(0,0,0,0.35)',
                        color: '#FFF',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                    />
                    {formErrors.state && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.state}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      maxLength={6}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: `1px solid ${formErrors.pincode ? '#EF4444' : 'rgba(255,255,255,0.12)'}`,
                        background: 'rgba(0,0,0,0.35)',
                        color: '#FFF',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                    />
                    {formErrors.pincode && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.pincode}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.92rem',
                        cursor: 'not-allowed',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary & Payment CTA */}
          <div>
            <div
              style={{
                background: 'rgba(10, 24, 18, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(218, 165, 32, 0.25)',
                borderRadius: '16px',
                padding: '1.8rem',
                position: 'sticky',
                top: '6rem',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--cream-silk, #FFF)', marginBottom: '1.2rem' }}>
                Order Summary
              </h2>

              {/* Items List */}
              <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.2rem', paddingRight: '0.3rem' }}>
                {validCartItems.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Your cart is empty.</p>
                ) : (
                  validCartItems.map((item: any, idx: number) => {
                    const p = item.product;
                    const inrPrice = p.priceInr || (p.price > 20 ? p.price : 199);
                    return (
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
                            src={p.image || '/assets/images/apple_chips.png'}
                            alt={p.name}
                            style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px', background: 'rgba(0,0,0,0.2)' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFF' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                              Qty: {item.quantity || 1} • {p.packSize || '50g'}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold-accent, #D4AF37)' }}>
                          ₹{inrPrice * (item.quantity || 1)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. FAMILY15)"
                  disabled={Boolean(appliedPromo)}
                  style={{
                    flex: 1,
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#FFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={Boolean(appliedPromo)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--gold-accent, #D4AF37)',
                    background: appliedPromo ? 'rgba(74, 222, 128, 0.2)' : 'transparent',
                    color: appliedPromo ? '#4ADE80' : 'var(--gold-accent, #D4AF37)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: appliedPromo ? 'default' : 'pointer',
                  }}
                >
                  {appliedPromo ? <Check size={16} /> : 'Apply'}
                </button>
              </form>

              {/* Price Breakdown */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', marginBottom: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                  <span>Subtotal</span>
                  <span>₹{clientSubtotal}</span>
                </div>
                {appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--gold-bright, #E5C07B)', marginBottom: '0.4rem' }}>
                    <span>Discount (FAMILY15)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--cream-silk, #FFF)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <span>Final Total</span>
                  <span>₹{estimatedTotal}</span>
                </div>
              </div>

              {/* Primary CTA */}
              <button
                onClick={handleProceedToPayment}
                disabled={isSubmitting || validCartItems.length === 0}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  background: isSubmitting || validCartItems.length === 0 ? 'rgba(218, 165, 32, 0.4)' : 'linear-gradient(135deg, #E5C07B 0%, #D4AF37 100%)',
                  color: '#06130E',
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  letterSpacing: '0.5px',
                  border: 'none',
                  cursor: isSubmitting || validCartItems.length === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>SECURELY CONNECTING TO RAZORPAY...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>PROCEED TO SECURE PAYMENT</span>
                  </>
                )}
              </button>

              {/* Trust Information */}
              <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
                  <ShieldCheck size={15} color="var(--gold-accent, #D4AF37)" />
                  <span>Secure payment powered by Razorpay</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginTop: '0.4rem' }}>
                  Supports UPI (GPay, PhonePe, Paytm), Debit/Credit Cards & Net Banking
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
