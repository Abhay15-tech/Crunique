'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_STORY_STEPS, BRAND_VALUES } from '../data/products';
import { Heart, ShieldCheck, Leaf, Globe, Award, Sparkles } from 'lucide-react';

export const FamilyStorySection = () => {
    return (
        <section id="our-story" style={{ padding: '7rem 0', background: 'radial-gradient(ellipse at 50% 0%, #0F281E 0%, #06130E 100%)', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        <Heart size={14} color="var(--apple-red)" /> Our Promise to Your Table
                    </span>
                    <h2 className="heading-lg" style={{ marginBottom: '1.2rem' }}>
                        From Our Family <span className="gold-gradient-text">to Yours</span>
                    </h2>
                    <p className="text-lead">
                        CRUNIQUE was created with a simple, unyielding belief: the best snacks come straight from nature. 
                        Every fruit slice carries our family’s dedication to care, purity, and trust.
                    </p>
                </div>

                <div style={{ marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h3 className="heading-md" style={{ color: 'var(--gold-bright)' }}>
                            The Journey from Orchard to Table
                        </h3>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.5rem',
                        position: 'relative'
                    }}>
                        {BRAND_STORY_STEPS.map((step, idx) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '20px',
                                    padding: '2rem 1.5rem',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontFamily: 'var(--font-serif)',
                                        fontWeight: 900,
                                        color: 'var(--gold-accent)',
                                        opacity: 0.6,
                                        marginBottom: '0.8rem'
                                    }}>
                                        {step.step}
                                    </div>
                                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--cream-silk)', marginBottom: '0.4rem' }}>
                                        {step.title}
                                    </h4>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
                                        {step.subtitle}
                                    </div>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--cream-muted)', lineHeight: 1.6 }}>
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, rgba(15, 40, 30, 0.9) 0%, rgba(6, 19, 14, 0.95) 100%)',
                    borderRadius: '32px',
                    border: '1px solid var(--border-gold)',
                    padding: '3.5rem 3rem',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '0.5rem' }}>
                            Uncompromising Family Values
                        </h3>
                        <p style={{ color: 'var(--cream-muted)', fontSize: '0.95rem' }}>
                            Why health-conscious families choose CRUNIQUE every single day.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {BRAND_VALUES.map((val) => (
                            <div key={val.title} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '16px',
                                    background: 'rgba(212, 175, 55, 0.12)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--gold-bright)',
                                    flexShrink: 0
                                }}>
                                    <Sparkles size={22} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cream-silk)', marginBottom: '0.4rem' }}>
                                        {val.title}
                                    </h4>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--cream-muted)', lineHeight: 1.6 }}>
                                        {val.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
