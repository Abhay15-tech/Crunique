'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, Volume2, VolumeX, ShieldCheck, Heart, Leaf } from 'lucide-react';

export const HeroStory = () => {
    const { navigateTo, soundEnabled, setSoundEnabled, playCrunchSound, addToCart } = useApp();
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

                    <button 
                        className="btn-secondary" 
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', gap: '0.5rem', borderRadius: '9999px' }}
                        title="Toggle Crunch Audio Experience"
                    >
                        {soundEnabled ? <Volume2 size={16} color="var(--gold-bright)" /> : <VolumeX size={16} />}
                        <span>Crunch Audio: {soundEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                </div>

                <div className="hero-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="heading-display" style={{ marginBottom: '1.2rem' }}>
                            Pure Real Fruit. <br />
                            <span className="gold-gradient-text">Unforgettable Crunch.</span>
                        </h1>

                        <p className="text-lead" style={{ marginBottom: '2rem', maxWidth: '540px' }}>
                            Transforming everyday snacking into an extraordinary family luxury experience. 
                            Made with 100% natural fruit, zero oil, zero added sugar, and endless love.
                        </p>

                        <div style={{ marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-accent)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                Story Journey: {STORY_STAGES[storyStep].label} ({storyStep + 1}/5)
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem' }}>
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

                            <div style={{ fontSize: '0.95rem', color: 'var(--cream-silk)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--gold-bright)' }}>✦</span> {STORY_STAGES[storyStep].text}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigateTo('shop')}
                            >
                                Shop 5 Launch Fruits <ArrowRight size={18} />
                            </button>

                            <button 
                                className="btn btn-secondary"
                                onClick={() => navigateTo('about')}
                            >
                                Our Family Story
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap', opacity: 0.85, fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Leaf size={16} color="var(--primary-green)" /> 100% Real Fruit
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <ShieldCheck size={16} color="var(--gold-accent)" /> Zero Added Sugar
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Heart size={16} color="var(--apple-red)" /> Family Crafted
                            </div>
                        </div>
                    </motion.div>

                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFruit.id}
                                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.95, rotate: 4 }}
                                transition={{ duration: 0.4 }}
                                style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    background: `radial-gradient(circle, ${currentFruit.accentGlow} 0%, transparent 70%)`,
                                    filter: 'blur(30px)'
                                }} />

                                <img
                                    src={currentFruit.image}
                                    alt={currentFruit.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                                        zIndex: 2
                                    }}
                                />

                                <div style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    left: '10px',
                                    background: 'rgba(6, 19, 14, 0.9)',
                                    border: `1px solid ${currentFruit.accentColor}`,
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(12px)',
                                    zIndex: 3
                                }}>
                                    <div style={{ fontSize: '0.75rem', color: currentFruit.accentColor, fontWeight: 700, textTransform: 'uppercase' }}>
                                        {currentFruit.badge}
                                    </div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                        {currentFruit.name}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 600 }}>
                                        ${currentFruit.price.toFixed(2)}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div 
                            className="scroll-pills-row"
                            style={{ 
                                marginTop: '2rem', 
                                background: 'rgba(255,255,255,0.04)', 
                                padding: '0.4rem', 
                                borderRadius: '9999px', 
                                border: '1px solid rgba(255,255,255,0.08)',
                                justifyContent: 'center'
                            }}
                        >
                            {CRUNIQUE_PRODUCTS.map((prod, idx) => (
                                <button
                                    key={prod.id}
                                    onClick={() => handleFruitChange(idx)}
                                    style={{
                                        padding: '0.45rem 0.85rem',
                                        borderRadius: '9999px',
                                        border: 'none',
                                        background: selectedFruitIndex === idx ? prod.accentColor : 'transparent',
                                        color: selectedFruitIndex === idx ? '#FFFFFF' : 'var(--cream-muted)',
                                        fontWeight: 600,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                        transition: 'all 0.25s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem'
                                    }}
                                >
                                    <span>{prod.name.split(' ')[1] || prod.name}</span>
                                </button>
                            ))}
                        </div>

                        <button 
                            className="btn btn-outline-gold"
                            onClick={() => addToCart(currentFruit, 1)}
                            style={{ marginTop: '1.2rem', width: '100%', maxWidth: '320px', padding: '0.7rem 1.5rem', fontSize: '0.85rem' }}
                        >
                            Quick Add {currentFruit.name} • ${currentFruit.price.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
