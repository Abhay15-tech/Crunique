'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS, PRODUCT_COLLECTIONS, PACK_SIZES } from '../data/products';
import { ShoppingBag, Eye, RotateCw, Star, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export const FruitExperienceShowcase = () => {
    const { addToCart, setSelectedProduct, playCrunchSound } = useApp();
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
    const [isFlipped, setIsFlipped] = useState(false);

    const activeProduct = CRUNIQUE_PRODUCTS[activeIndex];
    const activeSize = PACK_SIZES[selectedSizeIndex];

    const computedPrice = activeSize.price;

    const handleSelectFruit = (index) => {
        playCrunchSound();
        setActiveIndex(index);
        setIsFlipped(false);
    };

    return (
        <section id="launch-collection" style={{ padding: '6rem 0', background: 'var(--bg-scene)', position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        The 5 Signature Fruits • 3 Curated Collections
                    </span>
                    <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
                        Crafted for Everyday <span className="gold-gradient-text">Family Luxury</span>
                    </h2>
                    <p className="text-lead">
                        Do not settle for generic snacks. Experience timeless fruit flavors organized into our Classic, Exotic, and Tropical Collections.
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                    {CRUNIQUE_PRODUCTS.map((fruit, idx) => {
                        const isActive = activeIndex === idx;
                        return (
                            <button
                                key={fruit.id}
                                onClick={() => handleSelectFruit(idx)}
                                style={{
                                    padding: '0.75rem 1.4rem',
                                    borderRadius: '9999px',
                                    border: `1.5px solid ${isActive ? fruit.accentColor : 'rgba(255,255,255,0.08)'}`,
                                    background: isActive ? fruit.accentColor : 'rgba(255,255,255,0.03)',
                                    color: isActive ? '#FFFFFF' : 'var(--cream-muted)',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: isActive ? `0 10px 25px ${fruit.accentGlow}` : 'none'
                                }}
                            >
                                <span>{fruit.name}</span>
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '32px',
                            border: `1px solid rgba(255, 255, 255, 0.08)`,
                            padding: '3rem',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.2fr',
                            gap: '3.5rem',
                            alignItems: 'center',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div
                                style={{
                                    perspective: '1000px',
                                    width: '100%',
                                    maxWidth: '360px',
                                    height: '420px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setIsFlipped(!isFlipped)}
                                title="Click to flip package view"
                            >
                                <motion.div
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        padding: '1.5rem'
                                    }}>
                                        <img
                                            src={activeProduct.image}
                                            alt={activeProduct.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))'
                                            }}
                                        />
                                    </div>

                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        background: 'rgba(6, 19, 14, 0.95)',
                                        borderRadius: '24px',
                                        border: `1px solid ${activeProduct.accentColor}`,
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: activeProduct.accentColor, fontWeight: 700, textTransform: 'uppercase' }}>
                                                Nutrition & Facts ({activeProduct.nutrition.servingSize} Serving)
                                            </div>
                                            <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0 1rem', color: 'var(--cream-silk)' }}>
                                                {activeProduct.name}
                                            </h4>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.85rem' }}>
                                                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '8px' }}>
                                                    <strong>Calories:</strong> {activeProduct.nutrition.calories} kcal
                                                </div>
                                                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '8px' }}>
                                                    <strong>Fiber:</strong> {activeProduct.nutrition.dietaryFiber}
                                                </div>
                                                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '8px' }}>
                                                    <strong>Sugars:</strong> {activeProduct.nutrition.sugars}
                                                </div>
                                                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '8px' }}>
                                                    <strong>Shelf Life:</strong> 12 Months
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '0.8rem', color: 'var(--cream-dark)' }}>
                                            <strong>Storage:</strong> {activeProduct.storageInfo}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <button
                                className="btn-secondary"
                                onClick={() => setIsFlipped(!isFlipped)}
                                style={{ marginTop: '1.2rem', padding: '0.4rem 1.2rem', fontSize: '0.8rem', gap: '0.4rem', borderRadius: '9999px' }}
                            >
                                <RotateCw size={14} /> {isFlipped ? 'Show Front Package' : 'Flip to Nutrition Facts'}
                            </button>
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <span className="badge-gold" style={{ background: activeProduct.accentGlow, color: activeProduct.accentColor, borderColor: activeProduct.accentColor }}>
                                    {activeProduct.collection}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--gold-bright)', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Star size={14} fill="var(--gold-bright)" /> {activeProduct.rating} ({activeProduct.reviewsCount} reviews)
                                </div>
                            </div>

                            <h3 className="heading-lg" style={{ marginBottom: '0.4rem', color: 'var(--cream-silk)' }}>
                                {activeProduct.name}
                            </h3>

                            <p style={{ fontSize: '1.1rem', color: activeProduct.accentColor, fontWeight: 700, marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
                                "{activeProduct.tagline}"
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                {activeProduct.highlights.map(hl => (
                                    <div key={hl} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--cream-muted)' }}>
                                        <CheckCircle2 size={16} color={activeProduct.accentColor} />
                                        <span>{hl}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginBottom: '1.8rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold-accent)', marginBottom: '0.6rem' }}>
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
                                                    border: `1.5px solid ${isSelected ? activeProduct.accentColor : 'rgba(255,255,255,0.1)'}`,
                                                    background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                                                    color: 'var(--cream-silk)',
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{ps.size}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--gold-bright)' }}>${ps.price.toFixed(2)}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                <div>
                                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                        ${computedPrice.toFixed(2)}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', display: 'block', fontWeight: 500 }}>
                                        {activeSize.label} ({activeSize.size})
                                    </span>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart({ ...activeProduct, name: `${activeProduct.name} (${activeSize.size})`, price: computedPrice }, 1)}
                                    style={{ padding: '0.85rem 2rem', gap: '0.5rem' }}
                                >
                                    <ShoppingBag size={18} /> Add to Cart
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedProduct(activeProduct)}
                                    style={{ padding: '0.85rem 1.2rem' }}
                                    title="View Full Product Experience"
                                >
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};
