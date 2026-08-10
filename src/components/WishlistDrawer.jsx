'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer = () => {
    const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useApp();

    if (!isWishlistOpen) return null;

    const wishlistedProducts = CRUNIQUE_PRODUCTS.filter(p => wishlist.includes(p.id));

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
                        maxWidth: '440px',
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Heart size={22} color="var(--apple-red)" fill="var(--apple-red)" />
                                <h3 className="heading-md" style={{ color: 'var(--cream-silk)', fontSize: '1.4rem' }}>
                                    Your Wishlist ({wishlistedProducts.length})
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsWishlistOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--cream-silk)', cursor: 'pointer' }}
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {wishlistedProducts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--cream-dark)' }}>
                                <Heart size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                <p>Your wishlist is currently empty.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {wishlistedProducts.map(product => (
                                    <div
                                        key={product.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            background: 'rgba(255,255,255,0.02)',
                                            padding: '1rem',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--cream-silk)' }}>{product.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 600 }}>${product.price.toFixed(2)}</div>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => addToCart(product, 1)}
                                            style={{ padding: '0.5rem 0.8rem', fontSize: '0.75rem' }}
                                        >
                                            <ShoppingBag size={14} /> Add
                                        </button>
                                        <button onClick={() => toggleWishlist(product.id)} style={{ background: 'none', border: 'none', color: 'var(--cream-dark)', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
