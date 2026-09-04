'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS } from '../data/products';
import { Sparkles, ShieldCheck, Heart, Leaf } from 'lucide-react';

export const HeroStory = () => {
    const { playCrunchSound, addToCart } = useApp();
    const [selectedFruitIndex, setSelectedFruitIndex] = useState(0);
    const [storyStep, setStoryStep] = useState(0);

    const currentFruit = CRUNIQUE_PRODUCTS[selectedFruitIndex];

    const STORY_STAGES = [
        { label: "Nature", text: "100% Sun-Ripened Whole Fruits" },
        { label: "Fresh Fruits", text: "Hand-Picked at Peak Flavor" },
        { label: "Craftsmanship", text: "Low-Temp Vacuum Crisp Precision" },
        { label: "Crunch", text: "Unmatched Clean Crispness" },
        { label: "Happiness", text: "From Our Family to Yours" }
    ];

    const handleFruitChange = (index) => {
        playCrunchSound();
        setSelectedFruitIndex(index);
    };

    return (
        <section className="hero-section" id="hero">
            <div 
                className="hero-bg-glow" 
                style={{ 
                    top: '20%', 
                    left: '30%', 
                    background: currentFruit.accentColor 
                }} 
            />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="badge-gold"
                    >
                        <Sparkles size={14} /> From Our Family to Yours
                    </motion.div>
                </div>

                <div className="hero-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hero-text-content"
                        style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}
                    >
                        <h1 className="heading-display" style={{ marginBottom: '1.2rem' }}>
                            Pure Real Fruit. <br />
                            <span className="gold-gradient-text">Unforgettable Crunch.</span>
                        </h1>

                        <p className="text-lead" style={{ marginBottom: '2rem', maxWidth: '540px' }}>
                            Transforming everyday snacking into an extraordinary family luxury experience. 
                            Made with 100% natural fruit, zero oil, zero added sugar, and endless love.
                        </p>

                        <div className="hero-story-journey-box" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-accent)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                Story Journey: {STORY_STAGES[storyStep].label} ({storyStep + 1}/5)
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem', width: '100%' }}>
                                {STORY_STAGES.map((stage, idx) => (
                                    <button
                                        key={stage.label}
                                        onClick={() => setStoryStep(idx)}
                                        style={{
                                            flex: 1,
                                            height: '6px',
                                            borderRadius: '3px',
                                            background: idx <= storyStep ? 'var(--gold-accent)' : 'rgba(255,255,255,0.12)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                        title={stage.label}
                                    />
                                ))}
                            </div>

                            <div style={{ fontSize: '0.95rem', color: 'var(--cream-silk)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ color: 'var(--gold-bright)' }}>✦</span> {STORY_STAGES[storyStep].text}
                            </div>
                        </div>

                        <div className="hero-badges-row">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                                <Leaf size={16} color="var(--primary-green)" /> 100% Real Fruit
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                                <ShieldCheck size={16} color="var(--gold-accent)" /> Zero Added Sugar
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                                <Heart size={16} color="var(--apple-red)" /> Family Crafted
                            </div>
                        </div>
                    </motion.div>

                    <div className="hero-chip-stage">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFruit.id}
                                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                                transition={{ duration: 0.35 }}
                                className="hero-product-card"
                            >
                                {/* Glowing ambient backdrop */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '-20px',
                                    borderRadius: '50%',
                                    background: `radial-gradient(circle, ${currentFruit.accentGlow} 0%, transparent 65%)`,
                                    filter: 'blur(35px)',
                                    pointerEvents: 'none'
                                }} />

                                {/* Floating Collection Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    left: '16px',
                                    background: 'rgba(6, 19, 14, 0.85)',
                                    border: `1px solid ${currentFruit.accentColor}`,
                                    padding: '0.35rem 0.85rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    color: currentFruit.accentColor,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    zIndex: 4,
                                    backdropFilter: 'blur(8px)'
                                }}>
                                    ✦ {currentFruit.badge}
                                </div>

                                {/* Main High-Res Product Visual */}
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '2.5rem 1.5rem',
                                    zIndex: 2
                                }}>
                                    <img
                                        src={currentFruit.image.startsWith('/') ? currentFruit.image : `/${currentFruit.image}`}
                                        alt={currentFruit.name}
                                        style={{
                                            maxWidth: '85%',
                                            maxHeight: '85%',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.65))'
                                        }}
                                    />
                                </div>

                                {/* Bottom Product Info Badge */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '14px',
                                    left: '14px',
                                    right: '14px',
                                    background: 'rgba(6, 19, 14, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    padding: '0.7rem 1.2rem',
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(16px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    zIndex: 4
                                }}>
                                    <div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                            {currentFruit.name}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--cream-muted)' }}>
                                            100% Real Fruit • 0g Added Sugar
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.15rem', color: 'var(--gold-bright)', fontWeight: 800 }}>
                                            ${currentFruit.price.toFixed(2)}
                                        </div>
                                        <div style={{ fontSize: '0.68rem', color: 'var(--gold-accent)', fontWeight: 600, textTransform: 'uppercase' }}>
                                            50g Pack
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Interactive 5-Fruit Options Bar */}
                        <div className="hero-fruit-pills" role="tablist" aria-label="Choose 5 Launch Fruits">
                            {CRUNIQUE_PRODUCTS.map((prod, idx) => {
                                const isSelected = selectedFruitIndex === idx;
                                const FRUIT_EMOJIS = {
                                    'apple-chips': '🍎',
                                    'banana-chips': '🍌',
                                    'kiwi-chips': '🥝',
                                    'guava-chips': '🍈',
                                    'pineapple-chips': '🍍'
                                };
                                const emoji = FRUIT_EMOJIS[prod.id] || '✨';
                                const shortName = prod.name.replace('Crispy', '').replace('Crunchy', '').replace('Exotic', '').replace('Natural', '').replace('Tropical', '').replace('Chips', '').replace('Crisps', '').replace('Rings', '').trim();
                                return (
                                    <button
                                        key={prod.id}
                                        onClick={() => handleFruitChange(idx)}
                                        className={`hero-fruit-pill-btn ${isSelected ? 'active' : ''}`}
                                        style={{
                                            background: isSelected ? prod.accentColor : 'rgba(255,255,255,0.04)',
                                            color: isSelected ? '#FFFFFF' : 'var(--cream-muted)',
                                            borderColor: isSelected ? 'var(--gold-accent)' : 'rgba(255,255,255,0.08)'
                                        }}
                                        aria-selected={isSelected}
                                    >
                                        <span style={{ fontSize: '1rem' }}>{emoji}</span>
                                        <span>{shortName}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quick Add CTA */}
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(currentFruit, 1)}
                            style={{
                                marginTop: '1.4rem',
                                width: '100%',
                                maxWidth: '380px',
                                padding: '0.85rem 1.8rem',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.6rem'
                            }}
                        >
                            <span>Quick Add {currentFruit.name} • ${currentFruit.price.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
