'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CRUNIQUE_PRODUCTS } from '../data/products';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [activeView, setActiveView] = useState('home');
    const [introVisible, setIntroVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Device identification (mobile vs laptop/PC)
    const [deviceType, setDeviceType] = useState('desktop');
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            if (typeof window === 'undefined') return;
            const width = window.innerWidth;
            const userAgent = navigator.userAgent || '';
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

            let detected = 'desktop';
            if (width < 768 || (isMobileUA && width < 992)) {
                detected = 'mobile';
            } else if (width >= 768 && width <= 1024) {
                detected = 'tablet';
            } else {
                detected = 'desktop';
            }

            setDeviceType(detected);
            setIsMobile(detected === 'mobile');
            setIsTablet(detected === 'tablet');

            if (document.documentElement) {
                document.documentElement.setAttribute('data-device', detected);
                if (detected === 'mobile') {
                    document.documentElement.classList.add('is-mobile');
                    document.documentElement.classList.remove('is-desktop');
                } else {
                    document.documentElement.classList.add('is-desktop');
                    document.documentElement.classList.remove('is-mobile');
                }
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        window.addEventListener('orientationchange', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('orientationchange', checkDevice);
        };
    }, []);

    // Helper to sanitize items
    const sanitizeCartItem = (item) => {
        if (!item) return null;
        // Handle direct product or nested product format
        let prod = item.product || (item.id && item.price ? item : null);
        if (!prod || typeof prod.price !== 'number') {
            prod = CRUNIQUE_PRODUCTS[0];
        }
        return {
            product: prod,
            quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1
        };
    };

    // Cart & Wishlist state
    const [cart, setCart] = useState(() => {
        if (typeof window === 'undefined') return [{ product: CRUNIQUE_PRODUCTS[0], quantity: 2 }];
        try {
            const saved = localStorage.getItem('crunique_cart');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const sanitized = parsed.map(sanitizeCartItem).filter(Boolean);
                    return sanitized.length > 0 ? sanitized : [{ product: CRUNIQUE_PRODUCTS[0], quantity: 2 }];
                }
            }
            return [{ product: CRUNIQUE_PRODUCTS[0], quantity: 2 }];
        } catch (e) {
            return [{ product: CRUNIQUE_PRODUCTS[0], quantity: 2 }];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        if (typeof window === 'undefined') return ['apple-chips', 'kiwi-chips'];
        try {
            const saved = localStorage.getItem('crunique_wishlist');
            return saved ? JSON.parse(saved) : ['apple-chips', 'kiwi-chips'];
        } catch (e) {
            return ['apple-chips', 'kiwi-chips'];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('crunique_cart', JSON.stringify(cart));
        } catch (e) {}
    }, [cart]);

    useEffect(() => {
        try {
            localStorage.setItem('crunique_wishlist', JSON.stringify(wishlist));
        } catch (e) {}
    }, [wishlist]);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3200);
    };

    const playCrunchSound = () => {
        if (!soundEnabled || typeof window === 'undefined') return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            const ctx = new AudioContextClass();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);

            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        } catch (e) {}
    };

    const navigateTo = (viewName, productId = null) => {
        setActiveView(viewName);
        if (productId) {
            const found = CRUNIQUE_PRODUCTS.find(p => p.id === productId);
            if (found) setSelectedProduct(found);
        }
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const addToCart = (product, quantity = 1) => {
        playCrunchSound();
        if (!product) return;
        setCart(prevCart => {
            const validCart = prevCart.filter(item => item && item.product);
            const existingIndex = validCart.findIndex(item => item.product.id === product.id);
            if (existingIndex > -1) {
                const updated = [...validCart];
                updated[existingIndex].quantity += quantity;
                return updated;
            }
            return [...validCart, { product, quantity }];
        });
        showToast(`Added ${quantity}x ${product.name || 'Item'} to Cart 🛒`);
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item && item.product && item.product.id !== productId));
    };

    const updateCartQuantity = (productId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item && item.product && item.product.id === productId) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((sum, item) => {
        if (!item || !item.product || typeof item.product.price !== 'number') return sum;
        return sum + item.product.price * (item.quantity || 1);
    }, 0);

    const cartCount = cart.reduce((sum, item) => {
        if (!item) return sum;
        return sum + (item.quantity || 1);
    }, 0);

    const toggleWishlist = (productId) => {
        playCrunchSound();
        const product = CRUNIQUE_PRODUCTS.find(p => p.id === productId);
        setWishlist(prev => {
            const exists = prev.includes(productId);
            if (exists) {
                showToast(`Removed ${product ? product.name : 'item'} from Wishlist 🤍`);
                return prev.filter(id => id !== productId);
            } else {
                showToast(`Added ${product ? product.name : 'item'} to Wishlist ❤️`);
                return [...prev, productId];
            }
        });
    };

    const wishlistCount = wishlist.length;

    return (
        <AppContext.Provider value={{
            activeView,
            navigateTo,
            introVisible,
            setIntroVisible,
            cart,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            clearCart,
            cartTotal,
            cartCount,
            wishlist,
            toggleWishlist,
            wishlistCount,
            isCartOpen,
            setIsCartOpen,
            isWishlistOpen,
            setIsWishlistOpen,
            selectedProduct,
            setSelectedProduct,
            soundEnabled,
            setSoundEnabled,
            playCrunchSound,
            toastMessage,
            showToast,
            deviceType,
            isMobile,
            isTablet,
            isDesktop: deviceType === 'desktop'
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        return {
            activeView: 'home',
            navigateTo: () => {},
            cart: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartQuantity: () => {},
            clearCart: () => {},
            cartTotal: 0,
            cartCount: 0,
            wishlist: [],
            toggleWishlist: () => {},
            wishlistCount: 0,
            isCartOpen: false,
            setIsCartOpen: () => {},
            isWishlistOpen: false,
            setIsWishlistOpen: () => {},
            selectedProduct: null,
            setSelectedProduct: () => {},
            soundEnabled: true,
            setSoundEnabled: () => {},
            playCrunchSound: () => {},
            toastMessage: null,
            showToast: () => {},
            deviceType: 'desktop',
            isMobile: false,
            isTablet: false,
            isDesktop: true
        };
    }
    return context;
};
