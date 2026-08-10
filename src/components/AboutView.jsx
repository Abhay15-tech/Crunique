'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Sparkles, Leaf, ArrowRight } from 'lucide-react';

export const AboutView = () => {
    const { navigateTo } = useApp();

    return (
        <section id="about-page" style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--bg-scene)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        Our Family Heritage & Promise
                    </span>
                    <h1 className="heading-display" style={{ marginBottom: '1.2rem' }}>
                        Transforming Everyday Snacking into <span className="gold-gradient-text">Pure Luxury</span>
                    </h1>
                    <p className="text-lead">
                        CRUNIQUE was founded on a simple truth: nature gives us everything we need. 
                        Healthy food should never feel boring, plain, or compromised.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    marginBottom: '6rem'
                }}>
                    <div>
                        <h2 className="heading-lg" style={{ marginBottom: '1.2rem', color: 'var(--cream-silk)' }}>
                            From Our Family to Yours
                        </h2>
                        <p style={{ color: 'var(--cream-muted)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '1.02rem' }}>
                            We are a family-owned brand dedicated to crafting the finest 100% real fruit chips in India and around the globe. Every single fruit slice is selected at peak orchard ripeness and vacuum-crisped to retain its vivid color, natural vitamins, and intense natural flavor.
                        </p>
                        <p style={{ color: 'var(--cream-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.02rem' }}>
                            No added sugars, no artificial preservatives, no palm oil, and zero compromise. Just pure fruit goodness prepared with the exact care we bring to our own family table.
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigateTo('shop')}
                        >
                            Explore 5 Signature Launch Fruits <ArrowRight size={18} />
                        </button>
                    </div>

                    <div style={{ position: 'relative', textAlign: 'center' }}>
                        <div style={{
                            background: 'var(--bg-card)',
                            borderRadius: '32px',
                            border: '1px solid var(--border-gold)',
                            padding: '2.5rem',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <img
                                src="/assets/images/apple_chips.png"
                                alt="CRUNIQUE Craftsmanship"
                                style={{ maxHeight: '320px', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}
                            />
                            <div style={{ marginTop: '1.5rem', fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-bright)', fontFamily: 'var(--font-serif)' }}>
                                "Quality is not an accident. It is family honor."
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
