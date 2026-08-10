'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export const ContactView = () => {
    const { showToast } = useApp();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        showToast("Message sent to Family Concierge! We will respond shortly. 💚");
    };

    return (
        <section id="contact-page" style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--bg-scene)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        Family Concierge & Support
                    </span>
                    <h1 className="heading-display" style={{ marginBottom: '1.2rem' }}>
                        We Are Here for <span className="gold-gradient-text">Your Family</span>
                    </h1>
                    <p className="text-lead">
                        Have a question about our 5 launch fruits, order status, or corporate hampers? Reach out directly.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>
                    <div>
                        <h2 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '1.5rem' }}>
                            Get in Touch
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--cream-dark)' }}>Family Concierge Email:</div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--cream-silk)' }}>hello@crunique.com</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--cream-dark)' }}>Customer Support Hotline:</div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--cream-silk)' }}>+91 (800) 555-CRUN</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--cream-dark)' }}>Family Crafting Headquarters:</div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--cream-silk)' }}>Bengaluru & Mumbai, India</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '28px',
                        border: '1px solid var(--border-gold)',
                        padding: '2.5rem',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <CheckCircle size={48} color="var(--primary-green)" style={{ margin: '0 auto 1rem' }} />
                                <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '0.5rem' }}>
                                    Thank You!
                                </h3>
                                <p style={{ color: 'var(--cream-muted)' }}>
                                    Our Family Concierge has received your note and will get back to you shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
                                    Send Us a Message
                                </h3>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', display: 'block', marginBottom: '0.3rem' }}>Your Name:</label>
                                    <input type="text" required placeholder="Full Name" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#FFF', outline: 'none' }} />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', display: 'block', marginBottom: '0.3rem' }}>Email Address:</label>
                                    <input type="email" required placeholder="name@domain.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#FFF', outline: 'none' }} />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', display: 'block', marginBottom: '0.3rem' }}>Message:</label>
                                    <textarea required placeholder="How can our family serve yours?" style={{ width: '100%', height: '100px', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#FFF', outline: 'none', resize: 'none' }} />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', gap: '0.5rem' }}>
                                    <Send size={16} /> Send Message to Concierge
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
