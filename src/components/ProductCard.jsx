import React from 'react';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => {
    const { addToCart, wishlist, toggleWishlist } = useApp();
    const isWishlisted = wishlist.includes(product.id);

    return (
        <div className="product-card-3d">
            <div className="product-card-visual-3d">
                {/* Glow spot behind image */}
                <div style={{
                    position: 'absolute',
                    width: '140px', height: '140px',
                    background: 'radial-gradient(circle, rgba(63,163,77,0.15) 0%, transparent 70%)',
                    borderRadius: '50%', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    pointerEvents: 'none'
                }} />

                {/* Badge */}
                <span className="badge badge-green" style={{
                    position: 'absolute', top: '12px', left: '12px', zIndex: 2
                }}>
                    {product.badge || '100% Real Fruit'}
                </span>

                {/* Wishlist */}
                <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{
                        position: 'absolute', top: '10px', right: '10px', zIndex: 2,
                        width: '36px', height: '36px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.06)',
                        border: `1px solid ${isWishlisted ? 'rgba(242,100,100,0.4)' : 'rgba(255,255,255,0.1)'}`,
                        backdropFilter: 'blur(8px)',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        boxShadow: isWishlisted ? '0 0 12px rgba(242,100,100,0.3)' : 'none'
                    }}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {isWishlisted ? '❤️' : '🤍'}
                </button>

                <img
                    src={product.image}
                    alt={product.name}
                    style={{ height: '180px', objectFit: 'contain', margin: '0 auto', position: 'relative', zIndex: 1 }}
                />
            </div>

            <div className="product-card-body-3d">
                <h3 style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    color: 'var(--text-primary)', lineHeight: 1.3
                }}>
                    {product.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {product.flavor}
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                    <span style={{ color: '#FFD54F', letterSpacing: '1px' }}>★★★★★</span>
                    <span style={{ color: 'var(--text-muted)' }}>{product.rating} ({product.reviewsCount})</span>
                </div>

                {/* Weight & Calories */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{
                        fontSize: '0.75rem', color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-glass)'
                    }}>⚖️ {product.weight}</span>
                    <span style={{
                        fontSize: '0.75rem', color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-glass)'
                    }}>🔥 {product.calories} kcal</span>
                </div>

                {/* Price + CTA */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.6rem',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid var(--border-glass)'
                }}>
                    <div>
                        <span style={{
                            fontSize: '1.3rem', fontWeight: 800,
                            background: 'linear-gradient(135deg, #66C673, #3FA34D)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            ${product.price}
                        </span>
                        {product.originalPrice && (
                            <span style={{
                                fontSize: '0.85rem', color: 'var(--text-muted)',
                                textDecoration: 'line-through', marginLeft: '0.4rem'
                            }}>
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product, 1)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                    >
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
};
