'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { PACK_SIZES, COMBO_PACK_COLLECTIONS } from '../data/products';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Check, Sparkles, MapPin, Cpu, Activity, Clock, PackageCheck } from 'lucide-react';

export const ProductModal = () => {
    const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useApp();
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
    const [quantity, setQuantity] = useState(1);

    if (!selectedProduct) return null;

    const activeSize = PACK_SIZES[selectedSizeIndex];
    const unitPrice = activeSize.price;
    const isWishlisted = wishlist.includes(selectedProduct.id);

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                background: 'rgba(4, 13, 10, 0.85)',
                backdropFilter: 'blur(16px)'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="responsive-modal-box"
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: `1px solid var(--border-gold)`,
                        width: '100%',
                        maxWidth: '960px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '3rem',
                        position: 'relative',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    <button
                        onClick={() => setSelectedProduct(null)}
                        style={{
                            position: 'absolute',
                            top: '1.2rem',
                            right: '1.2rem',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--cream-silk)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div className="responsive-modal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
                        <div>
                            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}
                                />
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '0.4rem' }}>
                                    <MapPin size={14} /> Fruit Origin & Provenance:
                                </div>
                                <p style={{ color: 'var(--cream-muted)', marginBottom: '0.8rem', lineHeight: 1.5 }}>
                                    {selectedProduct.provenance || 'Sourced directly from family farms.'}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-bright)', fontWeight: 700, marginBottom: '0.4rem' }}>
                                    <Cpu size={14} /> How It Is Crafted:
                                </div>
                                <p style={{ color: 'var(--cream-muted)', lineHeight: 1.5 }}>
                                    {selectedProduct.craftProcess || 'Low-temperature vacuum dehydration preserving crunch.'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                                <span className="badge-gold">
                                    {selectedProduct.collection || 'Signature Fruit'}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--cream-dark)' }}>
                                    Shelf Life: 12 Months
                                </span>
                            </div>

                            <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '0.3rem' }}>
                                {selectedProduct.name}
                            </h3>

                            <p style={{ fontSize: '1.05rem', color: selectedProduct.accentColor || 'var(--gold-bright)', fontWeight: 700, fontStyle: 'italic', marginBottom: '0.8rem' }}>
                                "{selectedProduct.tagline}"
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', color: 'var(--gold-bright)', fontSize: '0.9rem' }}>
                                <Star size={16} fill="var(--gold-bright)" />
                                <strong>{selectedProduct.rating || 5.0}</strong>
                                <span style={{ color: 'var(--cream-muted)' }}>({selectedProduct.reviewsCount || 120} Verified Family Reviews)</span>
                            </div>

                            {selectedProduct.highlights && (
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '0.6rem' }}>
                                        Product Highlights & Health Benefits:
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--cream-muted)' }}>
                                        {selectedProduct.highlights.map(hl => (
                                            <div key={hl} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Check size={14} color="var(--primary-green)" /> <span>{hl}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    Select Pack Size Variation:
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                                    {PACK_SIZES.map((ps, idx) => {
                                        const isSelected = selectedSizeIndex === idx;
                                        return (
                                            <button
                                                key={ps.size}
                                                onClick={() => setSelectedSizeIndex(idx)}
                                                style={{
                                                    padding: '0.6rem 0.4rem',
                                                    borderRadius: '12px',
                                                    border: `1.5px solid ${isSelected ? 'var(--gold-accent)' : 'rgba(255,255,255,0.1)'}`,
                                                    background: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.3)',
                                                    color: 'var(--cream-silk)',
                                                    cursor: 'pointer',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{ps.size}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--gold-bright)' }}>${ps.price.toFixed(2)}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--cream-dark)', marginTop: '0.4rem' }}>
                                    ✦ {activeSize.label}: {activeSize.description}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', padding: '0.3rem 0.8rem' }}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ color: '#FFF', padding: '0.4rem', cursor: 'pointer', border: 'none', background: 'none' }}>-</button>
                                    <span style={{ padding: '0 0.8rem', fontWeight: 800, color: 'var(--gold-bright)' }}>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} style={{ color: '#FFF', padding: '0.4rem', cursor: 'pointer', border: 'none', background: 'none' }}>+</button>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        addToCart({ ...selectedProduct, name: `${selectedProduct.name} (${activeSize.size})`, price: unitPrice }, quantity);
                                        setSelectedProduct(null);
                                    }}
                                    style={{ flex: 1, padding: '0.85rem 1.5rem', gap: '0.5rem' }}
                                >
                                    <ShoppingBag size={18} /> Add to Cart • ${(unitPrice * quantity).toFixed(2)}
                                </button>

                                <button
                                    onClick={() => toggleWishlist(selectedProduct.id)}
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: isWishlisted ? 'var(--apple-red)' : 'var(--cream-silk)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Heart size={20} fill={isWishlisted ? "var(--apple-red)" : "none"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
