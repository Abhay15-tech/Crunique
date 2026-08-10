'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';

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

    return (
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
                        <div style={{ fontSize: '0.65rem', color: 'var(--gold-accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            From Our Family to Yours
                        </div>
                    </div>
                </a>

                {/* Desktop Navigation Links */}
                <nav style={{ display: mobileMenuOpen ? 'block' : undefined }}>
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
                                className={`nav-link ${activeView === 'home' ? '' : ''}`}
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
                    >
                        {soundEnabled ? <Volume2 size={18} color="var(--gold-bright)" /> : <VolumeX size={18} />}
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() => setIsWishlistOpen(true)}
                        title="View Wishlist"
                    >
                        <Heart size={18} />
                        {mounted && wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() => setIsCartOpen(true)}
                        title="View Cart"
                    >
                        <ShoppingBag size={18} />
                        {mounted && cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigateTo('shop')}
                        style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                    >
                        Shop 5 Fruits
                    </button>
                </div>
            </div>
        </header>
    );
};
