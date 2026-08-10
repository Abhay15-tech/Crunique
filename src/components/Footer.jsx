'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Leaf, ArrowRight, Sparkles } from 'lucide-react';

export const Footer = () => {
    const { navigateTo, showToast } = useApp();

    const handleNewsletter = (e) => {
        e.preventDefault();
        showToast("Welcome to the CRUNIQUE Family newsletter! Check your inbox for your 15% welcome discount. 💌");
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <img src="/assets/images/crunique_logo.jpg" alt="CRUNIQUE Logo" className="logo-img" />
                            <div>
                                <div className="logo-text">CRUNIQUE</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--gold-accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                                    From Our Family to Yours
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: 'var(--cream-muted)', lineHeight: 1.7, maxWidth: '340px', marginBottom: '1.5rem' }}>
                            India’s premier luxury real fruit chips brand. Made with 100% natural real fruit, zero oil, zero added sugar, and family trust.
                        </p>

                        <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 600 }}>
                            ✦ "From Our Family to Yours."
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            The 5 Fruits
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--cream-muted)' }}>
                            <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'apple-chips'); }}>Apple Chips</a></li>
                            <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'banana-chips'); }}>Banana Chips</a></li>
                            <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'kiwi-chips'); }}>Kiwi Chips</a></li>
                            <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'guava-chips'); }}>Guava Chips</a></li>
                            <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'pineapple-chips'); }}>Pineapple Chips</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Experience
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--cream-muted)' }}>
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Our Family Story</a></li>
                            <li><a href="#bundle" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Family Sampler Box</a></li>
                            <li><a href="#recipes" onClick={(e) => { e.preventDefault(); navigateTo('recipes'); }}>Gourmet Recipes</a></li>
                            <li><a href="#gifting" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Corporate Hampers</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Support & Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Join Our Family Circle
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--cream-muted)', marginBottom: '1rem' }}>
                            Subscribe to receive exclusive seasonal harvests, recipes, and a 15% welcome code.
                        </p>

                        <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <input
                                type="email"
                                required
                                placeholder="Enter family email address..."
                                style={{
                                    padding: '0.8rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: '#FFF',
                                    fontSize: '0.85rem',
                                    outline: 'none'
                                }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem', fontSize: '0.82rem', gap: '0.4rem' }}>
                                Join Family Circle <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--cream-dark)'
                }}>
                    <div>
                        © {new Date().getFullYear()} CRUNIQUE. All rights reserved. Made with ❤️ for families worldwide.
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Luxury Service</span>
                        <span>Eco-Pledge</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
