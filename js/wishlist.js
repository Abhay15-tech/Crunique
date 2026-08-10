// Crunique Wishlist Module

class WishlistState {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('crunique_wishlist')) || ["strawberry-chips", "mango-chips"];
        this.init();
    }

    init() {
        this.updateBadge();
        this.syncButtons();
    }

    save() {
        localStorage.setItem('crunique_wishlist', JSON.stringify(this.items));
        this.updateBadge();
        this.syncButtons();
        this.renderDrawer();
    }

    toggle(productId) {
        if (this.items.includes(productId)) {
            this.items = this.items.filter(id => id !== productId);
            if (window.showToast) window.showToast('Removed from Wishlist 🤍');
        } else {
            this.items.push(productId);
            if (window.showToast) window.showToast('Saved to your Wishlist ❤️');
        }
        this.save();
    }

    has(productId) {
        return this.items.includes(productId);
    }

    updateBadge() {
        const badge = document.getElementById('wishlist-count');
        if (badge) {
            badge.textContent = this.items.length;
        }
    }

    syncButtons() {
        const btns = document.querySelectorAll('.wishlist-btn');
        btns.forEach(btn => {
            const id = btn.getAttribute('data-product-id');
            if (id && this.has(id)) {
                btn.classList.add('active');
                btn.innerHTML = '❤️';
            } else if (id) {
                btn.classList.remove('active');
                btn.innerHTML = '🤍';
            }
        });
    }

    renderDrawer() {
        const container = document.getElementById('wishlist-items-container');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="text-center" style="padding: 3rem 1rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">💖</div>
                    <h4 class="heading-sm" style="margin-bottom: 0.5rem;">Your Wishlist is Empty</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Tap the heart icon on any fruit chip flavor to save it for later.</p>
                </div>
            `;
            return;
        }

        let html = '';
        this.items.forEach(id => {
            const product = CRUNIQUE_PRODUCTS.find(p => p.id === id);
            if (!product) return;

            html += `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${product.name}</div>
                        <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                        <button class="btn btn-primary add-cart-btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="window.cruniqueCart.addItem('${product.id}'); window.cruniqueWishlist.toggle('${product.id}');">
                            Move to Cart
                        </button>
                    </div>
                    <div class="cart-item-remove" onclick="window.cruniqueWishlist.toggle('${product.id}')" title="Remove">✕</div>
                </div>
            `;
        });
        container.innerHTML = html;
    }
}

window.cruniqueWishlist = new WishlistState();
