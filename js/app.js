// Crunique Core Application Logic & Router

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render Steps
    initIntroAnimation();
    renderPopularFlavors();
    renderBestSellersCarousel();
    renderReviews();
    renderFAQ();
    renderBlogs();
    setupEventListeners();
    setupScrollEffects();
    setup360ProductRotators();
});

// View Router
window.appRouter = function(viewName) {
    const views = ['home', 'shop', 'about', 'blog', 'contact'];
    
    // Hide all view containers if using view switches or scroll to section
    const mainSections = document.querySelectorAll('.page-view');
    mainSections.forEach(sec => sec.style.display = 'none');

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
        targetView.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Default to Home view
        document.getElementById('view-home').style.display = 'block';
        if (viewName === 'flavors') {
            document.getElementById('popular-flavors').scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Update nav active states
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-view') === viewName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (viewName === 'shop') {
        renderShopCatalog();
    }
};

// Render Popular Flavors Section
function renderPopularFlavors() {
    const grid = document.getElementById('popular-flavors-grid');
    if (!grid) return;

    grid.innerHTML = CRUNIQUE_PRODUCTS.slice(0, 6).map(product => window.createProductCardHTML(product)).join('');
}

// Render Best Sellers Carousel
function renderBestSellersCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    track.innerHTML = CRUNIQUE_PRODUCTS.map(product => window.createProductCardHTML(product)).join('');
}

// Carousel Controls
window.scrollCarousel = function(direction) {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    const scrollAmount = direction * 340;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

// Render Customer Reviews
function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container) return;

    container.innerHTML = CRUNIQUE_REVIEWS.map(review => `
        <div class="glass-card review-card">
            <div class="stars" style="margin-bottom: 0.8rem;">★★★★★</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem;">"${review.title}"</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${review.content}</p>
            <div class="review-author-wrap">
                <img src="${review.avatar}" alt="${review.author}" class="review-avatar">
                <div>
                    <div class="author-name">${review.author}</div>
                    <div class="author-role">Verified Buyer • ${review.role}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render FAQ Accordion
function renderFAQ() {
    const container = document.getElementById('faq-accordion');
    if (!container) return;

    container.innerHTML = CRUNIQUE_FAQS.map((faq, idx) => `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
            <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                <span>${faq.q}</span>
                <span class="faq-toggle-icon">▼</span>
            </div>
            <div class="faq-answer">
                ${faq.a}
            </div>
        </div>
    `).join('');
}

// Render Blogs Section
function renderBlogs() {
    const container = document.getElementById('blog-cards-grid');
    if (!container) return;

    container.innerHTML = CRUNIQUE_BLOGS.map(blog => `
        <div class="product-card" style="padding: 0; overflow: hidden;">
            <img src="${blog.image}" alt="${blog.title}" style="width: 100%; height: 200px; object-fit: cover;">
            <div style="padding: 1.5rem;">
                <span class="badge badge-orange" style="margin-bottom: 0.6rem;">${blog.category}</span>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.3;">${blog.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">${blog.excerpt}</p>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">
                    <span>${blog.date}</span>
                    <span>${blog.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Shop View Filter & Sort
let currentCategory = 'all';
let currentPriceMax = 10;

window.setShopFilter = function(category, btnEl) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderShopCatalog();
};

function renderShopCatalog() {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    let filtered = CRUNIQUE_PRODUCTS.filter(p => {
        const matchesCategory = currentCategory === 'all' || p.category.toLowerCase() === currentCategory.toLowerCase();
        const matchesPrice = p.price <= currentPriceMax;
        return matchesCategory && matchesPrice;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
                <h3>No flavors match your criteria</h3>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting your filter options or price slider.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(p => window.createProductCardHTML(p)).join('');
}

// Drawer Toggles
window.toggleCartDrawer = function() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
        drawer.classList.toggle('active');
        backdrop.classList.toggle('active');
        if (drawer.classList.contains('active')) window.cruniqueCart.renderDrawer();
    }
};

window.toggleWishlistDrawer = function() {
    const drawer = document.getElementById('wishlist-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
        drawer.classList.toggle('active');
        backdrop.classList.toggle('active');
        if (drawer.classList.contains('active')) window.cruniqueWishlist.renderDrawer();
    }
};

window.closeDrawers = function() {
    document.querySelectorAll('.drawer').forEach(d => d.classList.remove('active'));
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) backdrop.classList.remove('active');
};

// Search Overlay Logic
window.toggleSearchModal = function() {
    const overlay = document.getElementById('search-modal-overlay');
    if (overlay) {
        overlay.classList.toggle('active');
        if (overlay.classList.contains('active')) {
            const input = document.getElementById('search-input');
            if (input) {
                input.value = '';
                input.focus();
                window.handleSearchInput('');
            }
        }
    }
};

window.handleSearchInput = function(query) {
    const container = document.getElementById('search-results-container');
    if (!container) return;

    const clean = query.trim().toLowerCase();
    if (!clean) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:1rem;">Type a fruit flavor or keyword to search...</p>`;
        return;
    }

    const matches = CRUNIQUE_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(clean) || 
        p.flavor.toLowerCase().includes(clean) || 
        p.description.toLowerCase().includes(clean)
    );

    if (matches.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-secondary); padding:1.5rem;">No fruit chips found for "${query}"</p>`;
        return;
    }

    container.innerHTML = matches.map(p => `
        <div style="display:flex; align-items:center; gap:1rem; padding:0.8rem; border-bottom:1px solid var(--border-light); cursor:pointer;" onclick="window.toggleSearchModal(); window.openQuickView('${p.id}');">
            <img src="${p.image}" alt="${p.name}" style="width:50px; height:50px; object-fit:contain; background:var(--bg-alt); border-radius:8px; padding:4px;">
            <div>
                <div style="font-weight:700; font-size:0.95rem;">${p.name}</div>
                <div style="font-size:0.8rem; color:var(--text-secondary);">$${p.price.toFixed(2)} • ${p.calories} Calories</div>
            </div>
            <span style="margin-left:auto; color:var(--primary); font-weight:600; font-size:0.85rem;">View →</span>
        </div>
    `).join('');
};

// Event Listeners
function setupEventListeners() {
    // Newsletter Submit
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.onsubmit = (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input && input.value) {
                window.showToast(`Thank you! ${input.value} subscribed for 15% off coupon code. 🎉`);
                input.value = '';
            }
        };
    }
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 720-Degree Interactive Product Rotator on Cursor Touch, Click & Hover
function setup360ProductRotators() {
    const rotators = document.querySelectorAll('.product-360-img');
    
    rotators.forEach(img => {
        let currentRotation = 0;
        let isHovered = false;
        let isDragging = false;
        let startX = 0;
        let autoRotateFrame = null;

        // Smooth continuous 720° spin loop when hovered
        function autoSpin() {
            if (isHovered && !isDragging) {
                currentRotation = (currentRotation + 2.4) % 720;
                img.style.transform = `rotate(${currentRotation}deg) scale(1.08)`;
                autoRotateFrame = requestAnimationFrame(autoSpin);
            }
        }

        // Mouse Enter (Cursor touches image bounds)
        img.addEventListener('mouseenter', () => {
            isHovered = true;
            img.style.transition = 'transform 0.1s cubic-bezier(0.1, 1, 0.1, 1)';
            if (autoRotateFrame) cancelAnimationFrame(autoRotateFrame);
            autoSpin();
        });

        // Mouse Move (Cursor movement precisely rotates product image up to 720° - 2 full turns)
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate angle relative to center in degrees scaled to 720°
            const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            let degrees = (radians * (180 / Math.PI) + 90) * 2;
            if (degrees < 0) degrees += 720;
            
            currentRotation = degrees;
            img.style.transform = `rotate(${degrees}deg) scale(1.08)`;
        });

        // Click to trigger full 720° Spin Animation
        img.addEventListener('click', () => {
            window.trigger720Spin(img);
        });

        // Mouse Leave (Smooth return to 0°)
        img.addEventListener('mouseleave', () => {
            isHovered = false;
            if (autoRotateFrame) cancelAnimationFrame(autoRotateFrame);
            if (!img.classList.contains('spin-720-active')) {
                img.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                img.style.transform = 'rotate(0deg) scale(1)';
                currentRotation = 0;
            }
        });

        // Touch Interaction for mobile screens (720° swipe)
        img.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
        }, { passive: true });

        img.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touchX = e.touches[0].clientX;
            const deltaX = touchX - startX;
            currentRotation = (currentRotation + deltaX * 2.5) % 720;
            if (currentRotation < 0) currentRotation += 720;
            img.style.transform = `rotate(${currentRotation}deg) scale(1.08)`;
            startX = touchX;
        }, { passive: true });

        img.addEventListener('touchend', () => {
            isDragging = false;
            img.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            img.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// Trigger a 720-degree spin animation on target product image
window.trigger720Spin = function(element) {
    const target = element || document.getElementById('main-hero-product-img');
    if (!target) return;
    target.classList.remove('spin-720-active');
    // Force reflow
    void target.offsetWidth;
    target.classList.add('spin-720-active');
    setTimeout(() => {
        target.classList.remove('spin-720-active');
        target.style.transform = 'rotate(720deg) scale(1)';
    }, 1600);
};

// Front-End Animation Intro Controller
function initIntroAnimation() {
    const overlay = document.getElementById('intro-animation-overlay');
    const video = document.getElementById('intro-video');
    const progressBar = document.getElementById('intro-progress-bar');
    if (!overlay || !video) return;

    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const pct = (video.currentTime / video.duration) * 100;
            if (progressBar) progressBar.style.width = `${pct}%`;
        }
    });

    // Auto-transition to store when video completes
    video.addEventListener('ended', () => {
        window.skipIntro();
    });

    // Handle browser autoplay policies gracefully
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // If un-muted autoplay was blocked, fallback to muted autoplay
            video.muted = true;
            video.play();
        });
    }
}

window.skipIntro = function() {
    const overlay = document.getElementById('intro-animation-overlay');
    const video = document.getElementById('intro-video');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            if (video) video.pause();
        }, 800);
    }
};

window.toggleIntroAudio = function() {
    const video = document.getElementById('intro-video');
    const soundIcon = document.getElementById('sound-icon');
    const soundLabel = document.getElementById('sound-label');
    if (!video) return;

    if (video.muted) {
        video.muted = false;
        if (soundIcon) soundIcon.textContent = '🔊';
        if (soundLabel) soundLabel.textContent = 'Mute';
    } else {
        video.muted = true;
        if (soundIcon) soundIcon.textContent = '🔇';
        if (soundLabel) soundLabel.textContent = 'Unmute';
    }
};

window.replayIntro = function() {
    const overlay = document.getElementById('intro-animation-overlay');
    const video = document.getElementById('intro-video');
    const progressBar = document.getElementById('intro-progress-bar');

    if (overlay && video) {
        if (progressBar) progressBar.style.width = '0%';
        overlay.classList.remove('fade-out');
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.muted = true;
                video.play();
            });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

