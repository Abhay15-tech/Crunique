// Crunique Interactive Components & Modals

// Toast Notification Helper
window.showToast = function(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Render Product Card HTML
window.createProductCardHTML = function(product) {
    const isWishlisted = window.cruniqueWishlist ? window.cruniqueWishlist.has(product.id) : false;
    
    return `
        <div class="product-card" data-product-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
            ${product.badge ? `<span class="badge badge-green card-badge">${product.badge}</span>` : ''}
            <button class="btn-icon wishlist-btn ${isWishlisted ? 'active' : ''}" data-product-id="${product.id}" onclick="window.cruniqueWishlist.toggle('${product.id}')" title="Save to Wishlist">
                ${isWishlisted ? '❤️' : '🤍'}
            </button>
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}">
                <button class="btn btn-white quick-view-overlay-btn" onclick="window.openQuickView('${product.id}')">Quick View</button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-flavor">${product.flavor} • ${product.weight}</div>
                <div class="product-rating">
                    <div class="stars">★★★★★</div>
                    <span>${product.rating} (${product.reviewsCount})</span>
                    <span style="margin-left: auto; font-size: 0.8rem; font-weight:600; color:var(--primary);">${product.calories} Cal</span>
                </div>
                <div class="product-meta">
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="btn btn-primary add-cart-btn" onclick="window.cruniqueCart.addItem('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Open Quick View Modal
window.openQuickView = function(productId) {
    const product = CRUNIQUE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
        <div class="modal-box" style="max-width: 850px;">
            <button class="modal-close-btn" onclick="window.closeModal()">✕</button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center;">
                <div style="background: var(--bg-alt); padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                    <img src="${product.image}" alt="${product.name}" style="max-height: 280px; margin: 0 auto; object-fit: contain;">
                </div>
                <div>
                    <span class="badge badge-green" style="margin-bottom: 0.8rem;">${product.badge || 'Natural Snack'}</span>
                    <h2 class="heading-md" style="margin-bottom: 0.4rem;">${product.name}</h2>
                    <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem;">${product.flavor} • ${product.weight}</div>
                    
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem;">
                        <span style="font-size: 1.6rem; font-weight: 800; color: var(--primary-dark);">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span style="font-size: 1.1rem; color: var(--text-muted); text-decoration: line-through;">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        <div class="stars" style="margin-left: auto;">★★★★★ (${product.rating})</div>
                    </div>

                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">
                        ${product.description}
                    </p>

                    <div style="background: #F1F8F3; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--primary-dark); margin-bottom: 0.5rem;">Nutrition Highlights (${product.nutrition.servingSize})</h4>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-size: 0.85rem; font-weight: 600;">
                            <div>🔥 ${product.nutrition.calories} Cal</div>
                            <div>🌾 ${product.nutrition.dietaryFiber} Fiber</div>
                            <div>🍃 0g Trans Fat</div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="cart-item-qty" style="padding: 0.4rem 0.8rem;">
                            <button class="qty-btn" id="modal-qty-minus">-</button>
                            <span id="modal-qty-val" style="font-weight:700; font-size:1rem;">1</span>
                            <button class="qty-btn" id="modal-qty-plus">+</button>
                        </div>
                        <button class="btn btn-primary" style="flex-grow: 1;" id="modal-add-cart-btn">
                            Add to Cart • $<span id="modal-total-price">${product.price.toFixed(2)}</span>
                        </button>
                    </div>

                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${product.tags.map(tag => `<span style="background: var(--bg-alt); padding: 0.3rem 0.7rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight:600; color: var(--text-secondary);">✓ ${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');

    // Attach quantity logic inside modal
    let qty = 1;
    const minusBtn = document.getElementById('modal-qty-minus');
    const plusBtn = document.getElementById('modal-qty-plus');
    const qtyVal = document.getElementById('modal-qty-val');
    const totalPriceEl = document.getElementById('modal-total-price');
    const addBtn = document.getElementById('modal-add-cart-btn');

    minusBtn.onclick = () => {
        if (qty > 1) {
            qty--;
            qtyVal.textContent = qty;
            totalPriceEl.textContent = (product.price * qty).toFixed(2);
        }
    };
    plusBtn.onclick = () => {
        qty++;
        qtyVal.textContent = qty;
        totalPriceEl.textContent = (product.price * qty).toFixed(2);
    };
    addBtn.onclick = () => {
        window.cruniqueCart.addItem(product.id, qty);
        window.closeModal();
    };
};

// Close any open modal
window.closeModal = function() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
};

// Checkout Modal Flow Simulator
window.openCheckoutModal = function() {
    if (window.cruniqueCart.items.length === 0) {
        window.showToast('Your cart is empty! Add items before checkout.', 'warning');
        return;
    }

    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    if (!modalOverlay || !modalContent) return;

    const subtotal = window.cruniqueCart.getSubtotal();
    const discount = window.cruniqueCart.getDiscountAmount();
    const total = window.cruniqueCart.getTotal();

    modalContent.innerHTML = `
        <div class="modal-box" style="max-width: 650px;">
            <button class="modal-close-btn" onclick="window.closeModal()">✕</button>
            
            <div id="checkout-step-1">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1.5rem;">
                    <span class="badge badge-green">Secure 256-Bit Checkout</span>
                    <h2 class="heading-md" style="margin-left:auto;">Order Total: $${total.toFixed(2)}</h2>
                </div>

                <h3 class="heading-sm" style="margin-bottom:1rem;">1. Shipping Information</h3>
                <form id="shipping-form" onsubmit="event.preventDefault(); window.nextCheckoutStep(2);">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
                        <input type="text" placeholder="First Name *" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                        <input type="text" placeholder="Last Name *" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                    </div>
                    <input type="email" placeholder="Email Address (for tracking order) *" required style="width:100%; padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); margin-bottom:1rem; outline:none;">
                    <input type="text" placeholder="Street Address *" required style="width:100%; padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); margin-bottom:1rem; outline:none;">
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
                        <input type="text" placeholder="City *" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                        <input type="text" placeholder="State/Province *" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                        <input type="text" placeholder="Postal Code *" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                    </div>

                    <div style="background:var(--bg-alt); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem; display:flex; align-items:center; justify-content:space-between;">
                        <div>
                            <div style="font-weight:700; font-size:0.9rem;">⚡ Express Climate-Neutral Shipping</div>
                            <div style="font-size:0.8rem; color:var(--text-secondary);">Delivered in 2-3 Business Days</div>
                        </div>
                        <span style="font-weight:700; color:var(--primary-dark);">${subtotal >= 25 ? 'FREE' : '$3.99'}</span>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width:100%;">Continue to Payment →</button>
                </form>
            </div>

            <div id="checkout-step-2" style="display:none;">
                <h3 class="heading-sm" style="margin-bottom:1rem;">2. Payment Method</h3>
                <div style="display:flex; gap:1rem; margin-bottom:1.5rem;">
                    <button class="btn btn-outline" style="flex:1; border-color:var(--primary); background:var(--primary-soft);">Credit Card / Apple Pay</button>
                    <button class="btn btn-outline" style="flex:1;">PayPal</button>
                </div>

                <form onsubmit="event.preventDefault(); window.completeOrder();">
                    <input type="text" placeholder="Card Number *" value="4532 •••• •••• 8892" required style="width:100%; padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); margin-bottom:1rem; outline:none;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
                        <input type="text" placeholder="MM / YY *" value="08 / 28" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                        <input type="text" placeholder="CVC / CVV *" value="782" required style="padding:0.8rem; border:1px solid var(--border-light); border-radius:var(--radius-sm); outline:none;">
                    </div>
                    
                    <button type="submit" class="btn btn-secondary" style="width:100%; font-size:1.1rem; padding:1rem;">Pay $${total.toFixed(2)} & Place Order 🍓</button>
                </form>
            </div>

            <div id="checkout-step-3" style="display:none; text-align:center; padding:2rem 0;">
                <div style="width:80px; height:80px; background:var(--primary-soft); color:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 1.5rem auto; animation: pulseGlow 2s infinite;">✓</div>
                <h2 class="heading-md" style="margin-bottom:0.5rem;">Order Successfully Placed!</h2>
                <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Thank you for joining the Crunique family. Your order number is <strong id="order-id-display">#CRN-89420</strong>.</p>
                <div style="background:var(--bg-alt); padding:1.2rem; border-radius:var(--radius-md); max-width:400px; margin:0 auto 2rem auto; text-align:left; font-size:0.9rem;">
                    <div>🚚 <strong>Estimated Delivery:</strong> 2-3 Business Days</div>
                    <div style="margin-top:0.4rem;">🌱 <strong>Climate Impact:</strong> 100% Eco-Friendly Packaging</div>
                </div>
                <button class="btn btn-primary" onclick="window.closeModal(); window.appRouter('home');">Return to Homepage</button>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
};

window.nextCheckoutStep = function(step) {
    document.getElementById('checkout-step-1').style.display = step === 1 ? 'block' : 'none';
    document.getElementById('checkout-step-2').style.display = step === 2 ? 'block' : 'none';
    document.getElementById('checkout-step-3').style.display = step === 3 ? 'block' : 'none';
};

window.completeOrder = function() {
    const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('order-id-display').textContent = `#CRN-${randomOrderNum}`;
    window.nextCheckoutStep(3);
    window.cruniqueCart.items = [];
    window.cruniqueCart.save();
};
