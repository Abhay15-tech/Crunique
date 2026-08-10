import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ShopCatalog } from './components/ShopCatalog';
import { AboutView } from './components/AboutView';
import { RecipesView } from './components/RecipesView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { Sparkles } from 'lucide-react';

export const App = () => {
    const { activeView, toastMessage } = useApp();

    return (
        <div className="app-root">
            <CursorGlow />
            <Header />

            <main id="main-content">
                {activeView === 'home' && <HomeView />}
                {activeView === 'shop' && <ShopCatalog />}
                {activeView === 'about' && <AboutView />}
                {activeView === 'recipes' && <RecipesView />}
                {activeView === 'contact' && <ContactView />}
            </main>

            {/* Global Modals & Drawers */}
            <ProductModal />
            <CartDrawer />
            <WishlistDrawer />
            
            {/* Global Toast Notification */}
            {toastMessage && (
                <div className="toast-container">
                    <Sparkles size={18} color="var(--gold-bright)" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default App;
