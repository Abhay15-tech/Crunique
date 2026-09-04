'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';

export const Header = () => {
    const {
        activeView,
        navigateTo,
        cartCount,
        wishlistCount,
        setIsCartOpen,
        setIsWishlistOpen
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

    const handleNav = (viewName) => {
        setMobileMenuOpen(false);
        navigateTo(viewName);
    };

    return (
        <>
            <header className="header" id="main-header">
                <div className="container nav-wrapper">
                    {/* Brand Logo & Tagline */}
                    <a
                        href="#home"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNav('home');
                        }}
                    >
                        <img src="/assets/images/crunique_logo.jpg" alt="CRUNIQUE Logo" className="logo-img" />
                        <div>
                            <div className="logo-text">CRUNIQUE</div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--gold-accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                From Our Family to Yours
                            </div>
                        </div>
                    </a>

                    {/* Desktop Navigation Links: ONLY Home & Support */}
                    <nav className="desktop-nav">
                        <ul className="nav-links">
                            <li>
                                <a
                                    href="#home"
                                    className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNav('home');
                                    }}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className={`nav-link ${activeView === 'contact' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNav('contact');
                                    }}
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Header Actions: ONLY Wishlist & Cart */}
                    <div className="header-actions">
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNav('home');
                                }}
                            >
                                <span>Home</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={`mobile-nav-link ${activeView === 'contact' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNav('contact');
                                }}
                            >
                                <span>Support</span>
                                <ArrowRight size={16} opacity={0.6} />
                            </a>
                        </li>
                    </ul>
                </div>

                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--gold-accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                        ✦ FROM OUR FAMILY TO YOURS ✦
                    </div>
                </div>
            </aside>
        </>
    );
};
