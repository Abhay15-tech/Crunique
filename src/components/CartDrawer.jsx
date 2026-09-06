'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';

export const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartTotal, clearCart, showToast } = useApp();
    const [couponCode, setCouponCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);

    if (!isCartOpen) return null;

    const freeShippingLimit = 35.0;
    const safeCartTotal = typeof cartTotal === 'number' ? cartTotal : 0;
    const progressPercent = Math.min(100, (safeCartTotal / freeShippingLimit) * 100);
    const remainingForFreeShipping = Math.max(0, freeShippingLimit - safeCartTotal);

    const finalPrice = discountApplied ? safeCartTotal * 0.85 : safeCartTotal;

    const validCartItems = (Array.isArray(cart) ? cart : []).filter(item => item && item.product);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (couponCode.toUpperCase() === 'FAMILY15') {
            setDiscountApplied(true);
            showToast("Family Discount Code 'FAMILY15' Applied (-15%)! 🎉");
        } else {
            showToast("Invalid code. Try 'FAMILY15' for 15% off!");
        }
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        if (typeof window !== 'undefined') {
            window.location.href = '/checkout';
        }
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1100,
                display: 'flex',
                justifyContent: 'flex-end',
                background: 'rgba(4, 13, 10, 0.75)',
                backdropFilter: 'blur(12px)'
            }}>
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        width: '100%',
                        maxWidth: '460px',
                        height: '100vh',
                        background: 'var(--bg-scene)',
                        borderLeft: '1px solid var(--border-gold)',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <ShoppingBag size={22} color="var(--gold-accent)" />
                                <h3 className="heading-md" style={{ color: 'var(--cream-silk)', fontSize: '1.4rem' }}>
                                    Your Cart ({validCartItems.length})
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--cream-silk)', cursor: 'pointer' }}
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                                {remainingForFreeShipping > 0
                                    ? `Add $${remainingForFreeShipping.toFixed(2)} more for FREE Family Shipping 🚚`
                                    : '🎉 You unlocked FREE Family Shipping!'}
                            </div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-bright), var(--primary-green))', transition: 'width 0.3s ease' }} />
                            </div>
                        </div>

                        {validCartItems.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--cream-dark)' }}>
                                <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                <p style={{ fontSize: '1rem' }}>Your shopping cart is empty.</p>
                            </div>
                        ) : (
                            <div style={{ maxHeight: 'calc(100vh - 440px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {validCartItems.map(({ product, quantity }, idx) => {
                                    if (!product) return null;
                                    const price = typeof product.price === 'number' ? product.price : 0;
                                    const itemKey = `${product.id || 'item'}-${idx}`;
                                    return (
                                        <div
                                            key={itemKey}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                background: 'rgba(255,255,255,0.02)',
                                                padding: '0.9rem',
                                                borderRadius: '16px',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}
                                        >
                                            <img src={product.image || '/assets/images/apple_chips.png'} alt={product.name || 'Product'} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--cream-silk)' }}>{product.name || 'Fruit Crisp'}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 600 }}>${price.toFixed(2)}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem' }}>
                                                    <button onClick={() => updateCartQuantity(product.id, -1)} style={{ color: '#FFF', background: 'rgba(255,255,255,0.1)', border: 'none', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer' }}>-</button>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{quantity || 1}</span>
                                                    <button onClick={() => updateCartQuantity(product.id, 1)} style={{ color: '#FFF', background: 'rgba(255,255,255,0.1)', border: 'none', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer' }}>+</button>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(product.id)} style={{ background: 'none', border: 'none', color: 'var(--cream-dark)', cursor: 'pointer' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {validCartItems.length > 0 && (
                        <div>
                            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Promo code (e.g. FAMILY15)"
                                    disabled={discountApplied}
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem 1rem',
                                        borderRadius: '9999px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: '#FFF',
                                        fontSize: '0.82rem',
                                        outline: 'none'
                                    }}
                                />
                                <button type="submit" disabled={discountApplied} className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', borderRadius: '9999px' }}>
                                    {discountApplied ? <Check size={14} color="var(--primary-green)" /> : 'Apply'}
                                </button>
                            </form>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--cream-muted)', marginBottom: '0.3rem' }}>
                                    <span>Subtotal:</span> <span>${safeCartTotal.toFixed(2)}</span>
                                </div>
                                {discountApplied && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--gold-bright)', marginBottom: '0.3rem' }}>
                                        <span>Family Code (15% OFF):</span> <span>-${(safeCartTotal * 0.15).toFixed(2)}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                    <span>Total:</span> <span>${finalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={handleCheckout}
                                disabled={checkoutCompleted}
                                style={{ width: '100%', padding: '0.9rem', gap: '0.5rem' }}
                            >
                                {checkoutCompleted ? 'Order Confirmed! 🎉' : 'Proceed to Checkout ➔'}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
