// Crunique Shopping Cart Module

class CartState {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('crunique_cart')) || [
            { id: "apple-chips", quantity: 2 },
            { id: "mango-chips", quantity: 1 }
        ];
        this.discountCode = null;
        this.discountPercent = 0;
        this.freeShippingThreshold = 25.00;
        this.init();
    }

    init() {
        this.updateBadge();
        this.renderDrawer();
    }

    save() {
        localStorage.setItem('crunique_cart', JSON.stringify(this.items));
        this.updateBadge();
        this.renderDrawer();
    }

    addItem(productId, qty = 1) {
        const existing = this.items.find(item => item.id === productId);
        if (existing) {
            existing.quantity += qty;
        } else {
            this.items.push({ id: productId, quantity: qty });
        }
        this.save();
        
        const product = CRUNIQUE_PRODUCTS.find(p => p.id === productId);
        if (window.showToast) {
            window.showToast(`Added ${product ? product.name : 'Item'} to your cart! 🛒`);
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    }

    updateQuantity(productId, qty) {
        if (qty <= 0) {
            this.removeItem(productId);
            return;
        }
        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.quantity = qty;
            this.save();
        }
    }

    applyPromoCode(code) {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'CRUNIQUE20' || cleanCode === 'HEALTHY20') {
            this.discountCode = cleanCode;
            this.discountPercent = 0.20;
            this.save();
            if (window.showToast) window.showToast('Promo code applied: 20% OFF! 🎉');
            return { success: true, message: '20% Discount applied!' };
        } else {
            return { success: false, message: 'Invalid promo code. Try "CRUNIQUE20"' };
        }
    }

    getSubtotal() {
        return this.items.reduce((total, item) => {
            const prod = CRUNIQUE_PRODUCTS.find(p => p.id === item.id);
            return total + (prod ? prod.price * item.quantity : 0);
        }, 0);
    }

    getDiscountAmount() {
        return this.getSubtotal() * this.discountPercent;
    }

    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const shipping = subtotal >= this.freeShippingThreshold || subtotal === 0 ? 0 : 3.99;
        return Math.max(0, subtotal - discount + shipping);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateBadge() {
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.textContent = this.getItemCount();
        }
    }

    renderDrawer() {
        const container = document.getElementById('cart-items-container');
        const footerContainer = document.getElementById('cart-footer-container');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="text-center" style="padding: 3rem 1rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                    <h4 class="heading-sm" style="margin-bottom: 0.5rem;">Your Cart is Empty</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Looks like you haven't added any crunchy snacks yet.</p>
                    <button class="btn btn-primary" onclick="window.appRouter('shop')">Explore Flavors</button>
                </div>
            `;
            if (footerContainer) footerContainer.style.display = 'none';
            return;
        }

        if (footerContainer) footerContainer.style.display = 'block';

        const subtotal = this.getSubtotal();
        const progressPercent = Math.min(100, (subtotal / this.freeShippingThreshold) * 100);
        const amountLeft = (this.freeShippingThreshold - subtotal).toFixed(2);

        let html = `
            <div class="free-shipping-bar">
                <div class="free-shipping-text">
                    ${subtotal >= this.freeShippingThreshold 
                        ? '🎉 You unlocked FREE Shipping!' 
                        : `Add $${amountLeft} more for FREE Shipping`}
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;

        this.items.forEach(item => {
            const product = CRUNIQUE_PRODUCTS.find(p => p.id === item.id);
            if (!product) return;

            html += `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${product.name}</div>
                        <div class="cart-item-price">$${(product.price * item.quantity).toFixed(2)}</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="window.cruniqueCart.updateQuantity('${product.id}', ${item.quantity - 1})">-</button>
                            <span style="font-weight:600; font-size:0.9rem;">${item.quantity}</span>
                            <button class="qty-btn" onclick="window.cruniqueCart.updateQuantity('${product.id}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="cart-item-remove" onclick="window.cruniqueCart.removeItem('${product.id}')" title="Remove">✕</div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Update Summary Footer
        const subtotalEl = document.getElementById('cart-subtotal');
        const discountEl = document.getElementById('cart-discount');
        const totalEl = document.getElementById('cart-total');

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (discountEl) discountEl.textContent = `-$${this.getDiscountAmount().toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${this.getTotal().toFixed(2)}`;
    }
}

window.cruniqueCart = new CartState();
