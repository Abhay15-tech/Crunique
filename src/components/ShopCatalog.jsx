'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CRUNIQUE_PRODUCTS, PRODUCT_COLLECTIONS, COMBO_PACK_COLLECTIONS, PACK_SIZES } from '../data/products';
import { ShoppingBag, Eye, Heart, Star, Search, SlidersHorizontal, Gift, Package, Layers } from 'lucide-react';

export const ShopCatalog = () => {
    const { addToCart, setSelectedProduct, wishlist, toggleWishlist } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    const filteredFruits = CRUNIQUE_PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.tagline.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (selectedCategory === 'classic') return product.collection === 'Classic Collection';
        if (selectedCategory === 'exotic') return product.collection === 'Exotic Collection';
        if (selectedCategory === 'tropical') return product.collection === 'Tropical Collection';
        if (selectedCategory === 'combos') return false;

        return true;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
    });

    const showCombos = selectedCategory === 'all' || selectedCategory === 'combos';
    const filteredCombos = showCombos ? COMBO_PACK_COLLECTIONS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <section id="shop-catalog" style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--bg-scene)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
                    <span className="badge-gold" style={{ marginBottom: '1rem' }}>
                        Curated Fruit Collections & Combo Packs
                    </span>
                    <h1 className="heading-display" style={{ marginBottom: '1rem', fontSize: '3.2rem' }}>
                        The Signature <span className="gold-gradient-text">Store</span>
                    </h1>
                    <p className="text-lead">
                        Explore our 5 launch fruits organized into Classic, Exotic, and Tropical Collections, alongside our luxury Combo Pack Gift Boxes.
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                    <button
                        onClick={() => setSelectedCategory('all')}
                        style={{
                            padding: '0.7rem 1.4rem',
                            borderRadius: '9999px',
                            border: `1.5px solid ${selectedCategory === 'all' ? 'var(--gold-accent)' : 'rgba(255,255,255,0.08)'}`,
                            background: selectedCategory === 'all' ? 'var(--gold-accent)' : 'rgba(255,255,255,0.03)',
                            color: selectedCategory === 'all' ? 'var(--bg-deep)' : 'var(--cream-silk)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => setSelectedCategory('classic')}
                        style={{
                            padding: '0.7rem 1.4rem',
                            borderRadius: '9999px',
                            border: `1.5px solid ${selectedCategory === 'classic' ? '#D62828' : 'rgba(255,255,255,0.08)'}`,
                            background: selectedCategory === 'classic' ? '#D62828' : 'rgba(255,255,255,0.03)',
                            color: selectedCategory === 'classic' ? '#FFF' : 'var(--cream-silk)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        🍎 Classic Collection
                    </button>
                    <button
                        onClick={() => setSelectedCategory('exotic')}
                        style={{
                            padding: '0.7rem 1.4rem',
                            borderRadius: '9999px',
                            border: `1.5px solid ${selectedCategory === 'exotic' ? '#6BA539' : 'rgba(255,255,255,0.08)'}`,
                            background: selectedCategory === 'exotic' ? '#6BA539' : 'rgba(255,255,255,0.03)',
                            color: selectedCategory === 'exotic' ? '#FFF' : 'var(--cream-silk)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        🌿 Exotic Collection
                    </button>
                    <button
                        onClick={() => setSelectedCategory('tropical')}
                        style={{
                            padding: '0.7rem 1.4rem',
                            borderRadius: '9999px',
                            border: `1.5px solid ${selectedCategory === 'tropical' ? '#7CB342' : 'rgba(255,255,255,0.08)'}`,
                            background: selectedCategory === 'tropical' ? '#7CB342' : 'rgba(255,255,255,0.03)',
                            color: selectedCategory === 'tropical' ? '#FFF' : 'var(--cream-silk)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        🌴 Tropical Collection
                    </button>
                    <button
                        onClick={() => setSelectedCategory('combos')}
                        style={{
                            padding: '0.7rem 1.4rem',
                            borderRadius: '9999px',
                            border: `1.5px solid ${selectedCategory === 'combos' ? 'var(--gold-bright)' : 'rgba(255,255,255,0.08)'}`,
                            background: selectedCategory === 'combos' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.03)',
                            color: 'var(--gold-bright)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer'
                        }}
                    >
                        🎁 Combo Packs Collection
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.2rem 1.8rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 1.2rem', borderRadius: '9999px', flex: 1, maxWidth: '380px' }}>
                        <Search size={18} color="var(--gold-accent)" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Apple, Banana, Kiwi, Guava, Pineapple or Combos..."
                            style={{ background: 'none', border: 'none', color: 'var(--cream-silk)', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <SlidersHorizontal size={16} color="var(--cream-muted)" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                background: 'rgba(0,0,0,0.4)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'var(--cream-silk)',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '9999px',
                                fontSize: '0.85rem',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>

                {filteredFruits.length > 0 && (
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '1.8rem', fontSize: '1.6rem' }}>
                            Single Fruit Creations
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.2rem' }}>
                            {filteredFruits.map((product) => {
                                const isWishlisted = wishlist.includes(product.id);
                                return (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            background: 'var(--bg-card)',
                                            borderRadius: '24px',
                                            border: `1px solid rgba(255, 255, 255, 0.08)`,
                                            padding: '1.8rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            position: 'relative',
                                            boxShadow: 'var(--shadow-md)'
                                        }}
                                    >
                                        <button
                                            onClick={() => toggleWishlist(product.id)}
                                            style={{
                                                position: 'absolute',
                                                top: '1.2rem',
                                                right: '1.2rem',
                                                background: 'rgba(0,0,0,0.4)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isWishlisted ? 'var(--apple-red)' : 'var(--cream-silk)',
                                                cursor: 'pointer',
                                                zIndex: 5
                                            }}
                                        >
                                            <Heart size={18} fill={isWishlisted ? "var(--apple-red)" : "none"} />
                                        </button>

                                        <div>
                                            <div
                                                onClick={() => setSelectedProduct(product)}
                                                style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '1.2rem', background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '18px' }}
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{ height: '190px', objectFit: 'contain', margin: '0 auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }}
                                                />
                                            </div>

                                            <div style={{ fontSize: '0.75rem', color: product.accentColor, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                                                {product.collection}
                                            </div>

                                            <h3
                                                onClick={() => setSelectedProduct(product)}
                                                style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '0.3rem', cursor: 'pointer' }}
                                            >
                                                {product.name}
                                            </h3>

                                            <p style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontStyle: 'italic', marginBottom: '1.2rem' }}>
                                                "{product.tagline}"
                                            </p>
                                        </div>

                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                                                <div>
                                                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--cream-dark)', marginLeft: '0.4rem' }}>
                                                        / 50g
                                                    </span>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--gold-bright)', fontSize: '0.85rem', fontWeight: 600 }}>
                                                    <Star size={14} fill="var(--gold-bright)" /> {product.rating}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => addToCart(product, 1)}
                                                    style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}
                                                >
                                                    <ShoppingBag size={16} /> Add to Cart
                                                </button>

                                                <button
                                                    className="btn-secondary"
                                                    onClick={() => setSelectedProduct(product)}
                                                    style={{ padding: '0.65rem', borderRadius: '9999px' }}
                                                    title="View Full Product Experience"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {filteredCombos.length > 0 && (
                    <div>
                        <h2 className="heading-md" style={{ color: 'var(--gold-bright)', marginBottom: '1.8rem', fontSize: '1.6rem' }}>
                            🎁 Signature Combo Pack Collections
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.2rem' }}>
                            {filteredCombos.map((combo) => (
                                <div
                                    key={combo.id}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(15, 40, 30, 0.9) 0%, rgba(6, 19, 14, 0.95) 100%)',
                                        borderRadius: '24px',
                                        border: `1px solid var(--border-gold)`,
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <span className="badge-gold" style={{ background: 'rgba(212,175,55,0.15)', color: combo.accentColor }}>
                                                {combo.badge}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 600 }}>
                                                {combo.targetAudience.split(',')[0]}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--cream-silk)', marginBottom: '0.4rem' }}>
                                            {combo.name}
                                        </h3>

                                        <p style={{ fontSize: '0.88rem', color: 'var(--gold-bright)', fontStyle: 'italic', marginBottom: '0.8rem' }}>
                                            "{combo.tagline}"
                                        </p>

                                        <p style={{ fontSize: '0.9rem', color: 'var(--cream-muted)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                                            {combo.description}
                                        </p>

                                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem 1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--cream-silk)' }}>
                                            <strong>Includes:</strong> {combo.includedFruits.join(' • ')}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                                            <div>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--cream-silk)' }}>
                                                    ${combo.price.toFixed(2)}
                                                </span>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--cream-dark)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                                                    ${combo.originalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => addToCart({ id: combo.id, name: combo.name, price: combo.price, image: combo.image, description: combo.description }, 1)}
                                            style={{ width: '100%', padding: '0.8rem', gap: '0.5rem' }}
                                        >
                                            <ShoppingBag size={18} /> Buy Combo Pack
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
