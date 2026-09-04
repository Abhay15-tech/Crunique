'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Volume2, VolumeX, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Header = () => {
    const {
        activeView,
        navigateTo,
        cartCount,
        wishlistCount,
        setIsCartOpen,
        setIsWishlistOpen,
        soundEnabled,
        setSoundEnabled
    } = useApp();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleMobileNav = (view, anchorId) => {
        setMobileMenuOpen(false);
        navigateTo(view);
        if (anchorId) {
            setTimeout(() => {
                const el = document.getElementById(anchorId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        }
    };

    return (
        <>
            <header className="header" id="main-header">
                <div className="container nav-wrapper">
                    {/* Brand Logo & Tagline */}
                    <a
                        href="#home"
                        className="logo"
                        onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                    >
                        <img src="/assets/images/crunique_logo.jpg" alt="CRUNIQUE Logo" className="logo-img" />
                        <div>
                            <div className="logo-text">CRUNIQUE</div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--gold-accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                From Our Family to Yours
                            </div>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="desktop-nav">
                        <ul className="nav-links">
                            <li>
                                <a
                                    href="#home"
                                    className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#shop"
                                    className={`nav-link ${activeView === 'shop' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}
                                >
                                    5 Launch Fruits
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#bundle"
                                    className="nav-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('home');
                                        setTimeout(() => {
                                            const el = document.getElementById('bundle-builder');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                >
                                    Family Sampler Box
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className={`nav-link ${activeView === 'about' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
                                >
                                    Our Story
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#recipes"
                                    className={`nav-link ${activeView === 'recipes' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo('recipes'); }}
                                >
                                    Recipes & Pairings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className={`nav-link ${activeView === 'contact' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Header Actions */}
                    <div className="header-actions">
                        <button
                            className="icon-btn"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            title={soundEnabled ? "Mute Audio" : "Enable Audio"}
                            aria-label="Toggle crunch audio"
                        >
                            {soundEnabled ? <Volume2 size={18} color="var(--gold-bright)" /> : <VolumeX size={18} />}
                        </button>

                        <button
                            className="icon-btn"
                            onClick={() => setIsWishlistOpen(true)}
                            title="View Wishlist"
                            aria-label="Wishlist"
                        >
                            <Heart size={18} />
                            {mounted && wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
                        </button>

                        <button
                            className="icon-btn"
                            onClick={() => setIsCartOpen(true)}
                            title="View Cart"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag size={18} />
                            {mounted && cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
                        </button>

                        <button
                            className="btn btn-primary header-cta-btn"
                            onClick={() => navigateTo('shop')}
                            style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                        >
                            Shop 5 Fruits
                        </button>

                        {/* Mobile Hamburger Menu Toggle Button */}
                        <button
                            className="icon-btn mobile-menu-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            style={{ borderColor: mobileMenuOpen ? 'var(--gold-accent)' : undefined }}
                        >
                            {mobileMenuOpen ? <X size={20} color="var(--gold-bright)" /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Slide-in Drawer Overlay & Navigation */}
            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            <aside className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <img src="/assets/images/crunique_logo.jpg" alt="CRUNIQUE" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--gold-accent)' }} />
                            <div>
                                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--cream-silk)' }}>CRUNIQUE</div>
                                <div style={{ fontSize: '0.58rem', color: 'var(--gold-accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>From Our Family to Yours</div>
                            </div>
                        </div>
                        <button
                            className="icon-btn"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                            style={{ width: '36px', height: '36px' }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <ul className="mobile-nav-links">
                        <li>
                            <a
                                href="#home"
                                className={`mobile-nav-link ${activeView === 'home' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav('home'); }}
                            >
                                <span>Home</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#shop"
                                className={`mobile-nav-link ${activeView === 'shop' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav('shop'); }}
                            >
                                <span>5 Launch Fruits</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#bundle"
                                className="mobile-nav-link"
                                onClick={(e) => { e.preventDefault(); handleMobileNav('home', 'bundle-builder'); }}
                            >
                                <span>Family Sampler Box</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className={`mobile-nav-link ${activeView === 'about' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav('about'); }}
                            >
                                <span>Our Story</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#recipes"
                                className={`mobile-nav-link ${activeView === 'recipes' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav('recipes'); }}
                            >
                                <span>Recipes & Pairings</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={`mobile-nav-link ${activeView === 'contact' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav('contact'); }}
                            >
                                <span>Support</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                    </ul>
                </div>

                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.6rem 1rem', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--cream-muted)' }}>Crunch Audio</span>
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: 'transparent',
                                border: 'none',
                                color: soundEnabled ? 'var(--gold-bright)' : 'var(--cream-muted)',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                                fontWeight: 600
                            }}
                        >
                            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            {soundEnabled ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => handleMobileNav('shop')}
                        style={{ width: '100%', padding: '0.85rem' }}
                    >
                        Shop 5 Launch Fruits <ArrowRight size={16} />
                    </button>
                </div>
            </aside>
        </>
    );
};
