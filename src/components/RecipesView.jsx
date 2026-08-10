'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS } from '../data/products';
import { Utensils, Sparkles, ArrowRight } from 'lucide-react';

export const RecipesView = () => {
    const { navigateTo } = useApp();

    return (
        <section id="recipes-page" style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--bg-scene)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        <Utensils size={14} /> Culinary Pairings & Recipes
                    </span>
                    <h1 className="heading-display" style={{ marginBottom: '1.2rem' }}>
                        Elevate Your <span className="gold-gradient-text">Snacking Ritual</span>
                    </h1>
                    <p className="text-lead">
                        Discover gourmet pairings, smoothie bowls, charcuterie accents, and wellness recipes crafted around our 5 launch fruits.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {CRUNIQUE_PRODUCTS.map((prod) => (
                        <div
                            key={prod.id}
                            style={{
                                background: 'var(--bg-card)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                padding: '2rem',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            <img
                                src={prod.image}
                                alt={prod.name}
                                style={{ height: '160px', objectFit: 'contain', margin: '0 auto 1.5rem', display: 'block' }}
                            />
                            <span className="badge-gold" style={{ background: prod.accentGlow, color: prod.accentColor, borderColor: prod.accentColor, marginBottom: '0.8rem' }}>
                                Pairing for {prod.name}
                            </span>

                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '0.6rem' }}>
                                Gourmet {prod.name.split(' ')[1]} Harmony
                            </h3>

                            <p style={{ fontSize: '0.9rem', color: 'var(--cream-muted)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                                Pair with {prod.pairings ? prod.pairings.join(', ') : 'Greek yogurt, dark chocolate, and organic honey'}.
                            </p>

                            <button
                                className="btn btn-outline-gold"
                                onClick={() => navigateTo('shop')}
                                style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                            >
                                Shop {prod.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
