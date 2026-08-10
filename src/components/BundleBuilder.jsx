'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS, COMBO_PACK_COLLECTIONS } from '../data/products';
import { PackageCheck, Gift, Plus, Minus, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export const BundleBuilder = () => {
    const { addToCart, showToast, playCrunchSound } = useApp();
    const [selectedCombo, setSelectedCombo] = useState(COMBO_PACK_COLLECTIONS[0]);
    const [giftNote, setGiftNote] = useState('');

    const handleBuyCombo = (combo) => {
        playCrunchSound();
        addToCart({
            id: combo.id,
            name: combo.name,
            price: combo.price,
            image: combo.image,
            description: `${combo.description} ${giftNote ? `Gift Note: "${giftNote}"` : ''}`
        }, 1);
        showToast(`Added ${combo.name} to Cart! 🎁`);
    };

    return (
        <section id="bundle-builder" style={{ padding: '6.5rem 0', background: 'var(--bg-scene)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        <Gift size={14} /> Curated Combo Pack Collection
                    </span>
                    <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
                        Elevated <span className="gold-gradient-text">Combo Packs & Gift Bundles</span>
                    </h2>
                    <p className="text-lead">
                        Maximize healthy snacking value with our signature curated combo packs designed for fitness lovers, families, corporate gifts, and travel.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.2rem',
                    marginBottom: '4rem'
                }}>
                    {COMBO_PACK_COLLECTIONS.map((combo) => {
                        const isSelected = selectedCombo.id === combo.id;
                        return (
                            <motion.div
                                key={combo.id}
                                whileHover={{ y: -6 }}
                                style={{
                                    background: isSelected ? 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(15,40,30,0.9) 100%)' : 'var(--bg-card)',
                                    borderRadius: '28px',
                                    border: `1.5px solid ${isSelected ? 'var(--gold-accent)' : 'rgba(255,255,255,0.08)'}`,
                                    padding: '2.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span className="badge-gold" style={{ background: 'rgba(212,175,55,0.15)', color: combo.accentColor }}>
                                            {combo.badge}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--cream-dark)', fontWeight: 600 }}>
                                            Save upto 25%
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '0.4rem' }}>
                                        {combo.name}
                                    </h3>

                                    <p style={{ fontSize: '0.88rem', color: 'var(--gold-bright)', fontStyle: 'italic', marginBottom: '0.8rem' }}>
                                        "{combo.tagline}"
                                    </p>

                                    <p style={{ fontSize: '0.9rem', color: 'var(--cream-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                        {combo.description}
                                    </p>

                                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem 1rem', borderRadius: '14px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--cream-silk)' }}>
                                        <div style={{ color: 'var(--gold-accent)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                                            Target Audience & Purpose:
                                        </div>
                                        <div>{combo.targetAudience}</div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                                        <div>
                                            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                                ${combo.price.toFixed(2)}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--cream-dark)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                                                ${combo.originalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleBuyCombo(combo)}
                                        style={{ width: '100%', padding: '0.85rem', gap: '0.5rem', fontSize: '0.9rem' }}
                                    >
                                        <PackageCheck size={18} /> Add Combo to Cart
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
