'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Gift, Award, Send, Check } from 'lucide-react';

export const CorporateGifting = () => {
    const { showToast } = useApp();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        quantity: '50'
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        showToast("Gifting request received! Our Family Concierge will contact you in 2 hours. 🎁");
    };

    return (
        <section id="gifting" style={{ padding: '6.5rem 0', background: 'radial-gradient(circle at 50% 50%, #0B1E17 0%, #040D0A 100%)', position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        <Award size={14} /> Luxury Gifting & Corporate Hampers
                    </span>
                    <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
                        Elevate Corporate & <span className="gold-gradient-text">Family Celebrations</span>
                    </h2>
                    <p className="text-lead">
                        Impress clients, colleagues, and loved ones with bespoke eco-luxury hampers filled with our 5 launch fruit chip creations.
                    </p>
                </div>

                <div 
                    className="responsive-grid-2"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                        gap: '2.5rem',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '28px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '3rem'
                    }}
                >
                    <div>
                        <div style={{
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            textAlign: 'center',
                            border: '1px solid var(--border-gold)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>

                            <img
                                src="/assets/images/apple_chips.png"
                                alt="Luxury Box"
                                style={{ height: '220px', objectFit: 'contain', margin: '0 auto 1.5rem', position: 'relative', zIndex: 2 }}
                            />

                            <h3 style={{ fontSize: '1.3rem', color: 'var(--cream-silk)', marginBottom: '0.4rem', position: 'relative', zIndex: 2 }}>
                                The CRUNIQUE Grand Legacy Hamper
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 600, position: 'relative', zIndex: 2 }}>
                                Includes All 5 Signature Real Fruit Crisps + Personalized Card
                            </p>


                        </div>
                    </div>

                    <div>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'rgba(63, 163, 77, 0.2)',
                                    color: 'var(--primary-green)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <Check size={32} />
                                </div>
                                <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '0.8rem' }}>
                                    Request Confirmed!
                                </h3>
                                <p style={{ color: 'var(--cream-muted)', fontSize: '0.9rem' }}>
                                    Thank you! Our Corporate Family Concierge will email your custom proposal within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
                                    Request Corporate & Bulk Proposal
                                </h3>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', display: 'block', marginBottom: '0.3rem' }}>Your Name:</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Eleanor Vance"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem 1rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: 'var(--cream-silk)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', display: 'block', marginBottom: '0.3rem' }}>Company / Organization:</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="e.g. Apex Wealth Global"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem 1rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: 'var(--cream-silk)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', display: 'block', marginBottom: '0.3rem' }}>Business Email:</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="eleanor@company.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem 1rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: 'var(--cream-silk)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '0.9rem', gap: '0.5rem' }}
                                >
                                    <Send size={16} /> Request Custom Quote & Mockup
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
