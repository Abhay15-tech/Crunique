'use client';

import React, { useEffect, useRef } from 'react';

export const CursorGlow = () => {
    const cursorDotRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const moveCursor = (e) => {
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div
            ref={cursorDotRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '320px',
                height: '320px',
                marginLeft: '-160px',
                marginTop: '-160px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'transform 0.1s ease-out'
            }}
        />
    );
};
