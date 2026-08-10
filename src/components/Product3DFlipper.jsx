import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const Product3DFlipper = () => {
    const { navigateTo } = useApp();
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const containerRef = useRef(null);

    // Mouse Movement tracks cursor horizontally (Left/Right) and vertically (Up/Down)
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const width = rect.width;
        const height = rect.height;
        
        const pctX = Math.max(0, Math.min(1, mouseX / width));
        const pctY = Math.max(0, Math.min(1, mouseY / height));
        
        // Left-to-right horizontal rotation (0deg to 180deg)
        const angleY = pctX * 180;
        
        // Up-to-down vertical 3D rotation tilt (-60deg to +60deg)
        const angleX = (pctY - 0.5) * -120;
        
        setRotationY(angleY);
        setRotationX(angleX);
    };

    const handleMouseLeave = () => {
        setRotationY(isFlipped ? 180 : 0);
        setRotationX(0);
    };

    const toggleFlip = (e) => {
        e.stopPropagation();
        const nextFlipped = !isFlipped;
        setIsFlipped(nextFlipped);
        setRotationY(nextFlipped ? 180 : 0);
        setRotationX(0);
    };

    const handleProductClick = () => {
        navigateTo('shop');
    };

    return (
        <div className="product-3d-flipper-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Interactive 3D Multi-Axis Flip Stage - Click to redirect to Shop Product */}
            <div 
                ref={containerRef}
                className="product-3d-stage"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleProductClick}
                title="Click to View Product in Shop"
                style={{
                    perspective: '1200px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '1rem',
                    position: 'relative'
                }}
            >
                <div 
                    className="product-3d-card"
                    style={{
                        width: '320px',
                        height: '440px',
                        maxHeight: 'calc(65vh - 100px)',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                        transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)',
                    }}
                >
                    {/* FRONT FACE (product2.jpeg) */}
                    <div 
                        className="product-card-face front-face"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'rotateY(0deg)',
                        }}
                    >
                        <img 
                            src="product2.jpeg" 
                            alt="Product Front View" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.18))',
                                borderRadius: '16px'
                            }} 
                        />
                    </div>

                    {/* BACK FACE (backforwed-product.jpeg) */}
                    <div 
                        className="product-card-face back-face"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <img 
                            src="backforwed-product.jpeg" 
                            alt="Product Back View" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.18))',
                                borderRadius: '16px'
                            }} 
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Control Buttons & Navigation CTA */}
            <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                    className="btn btn-outline" 
                    onClick={toggleFlip}
                    style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', borderRadius: '9999px', background: 'var(--bg-glass)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
                >
                    {rotationY > 90 ? '↩ View Front' : '↪ View Back'}
                </button>

                <button 
                    className="btn btn-primary" 
                    onClick={() => navigateTo('shop')}
                    style={{ padding: '0.55rem 1.4rem', fontSize: '0.9rem' }}
                >
                    🛍️ Shop Product Now ➔
                </button>
            </div>
            
            <span style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                💡 Click on product image to go directly to Shop
            </span>
        </div>
    );
};
