import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CuratedRange from './components/CuratedRange';
import Collections from './components/Collections';
import FeaturedIn from './components/FeaturedIn';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import AccountPage from './components/AccountPage';
import ChompsHighlights from './components/ChompsHighlights';
import MakhanaCansSection from './components/MakhanaCansSection';
import AboutPage from './components/AboutPage';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

import { PRODUCTS } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const { user, profile, sessionRole } = useAuth();
  const [currentView, setView] = useState<'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about' | 'admin'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0); // 0.1 for 10%

  // Load products dynamically from Firestore with static PRODUCTS fallback
  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const prodColRef = collection(db, 'products');
        const snap = await getDocs(prodColRef);
        if (!snap.empty) {
          const list: Product[] = [];
          snap.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as Product);
          });
          setProductsList(list);
        } else {
          // Bootstrap Firestore products collection with initial high quality defaults
          for (const item of PRODUCTS) {
            await setDoc(doc(db, 'products', item.id), item);
          }
          setProductsList(PRODUCTS);
        }
      } catch (err) {
        console.warn("Could not retrieve custom products, falling back to local snacks:", err);
        setProductsList(PRODUCTS);
      }
    }
    loadLiveProducts();
  }, []);

  // Synchronize Google User Cloud-Saved Wishlist when they sign in
  useEffect(() => {
    if (profile?.wishlist && productsList.length > 0) {
      const synced: Product[] = [];
      profile.wishlist.forEach((id: string) => {
        const found = productsList.find(p => p.id === id);
        if (found) synced.push(found);
      });
      if (synced.length > 0) {
        setWishlist(synced);
      }
    }
  }, [profile?.wishlist, productsList]);

  // Route guarding for admin portal
  const isAdmin = (user?.email && ['priyanshujha1402@gmail.com', 'priyanshujha2610@gmail.com'].includes(user.email) || profile?.role === 'admin') && sessionRole === 'admin';

  useEffect(() => {
    const handleUrlNavigation = () => {
      const params = new URLSearchParams(window.location.search);
      const isUrlAdmin = params.get('page') === 'admin' || params.get('view') === 'admin' || window.location.hash === '#admin';
      if (isUrlAdmin) {
        if (isAdmin) {
          setView('admin');
        } else {
          // Block completely and redirect to home
          setView('home');
          // Strip the admin path from the URL to enforce strict separation
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    };
    handleUrlNavigation();
    window.addEventListener('hashchange', handleUrlNavigation);
    return () => window.removeEventListener('hashchange', handleUrlNavigation);
  }, [isAdmin]);

  useEffect(() => {
    if (currentView === 'admin' && !isAdmin) {
      setView('home');
    }
  }, [currentView, isAdmin]);

  // Local storage loaded on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('twirtles_cart');
      const storedWishlist = localStorage.getItem('twirtles_wishlist');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.warn('LocalStorage is disabled or restricted inside preview iframe.');
    }
  }, []);

  // Save changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('twirtles_cart', JSON.stringify(newCart));
    } catch (e) {}
  };

  const saveWishlist = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    try {
      localStorage.setItem('twirtles_wishlist', JSON.stringify(newWishlist));
    } catch (e) {}
  };

  // Add to cart helper
  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      const updated = cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  // Update item quantity
  const updateCartQty = (productId: string, val: number) => {
    if (val <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: val }
        : item
    );
    saveCart(updated);
  };

  // Clear entire cart after success checkout
  const clearCart = () => {
    saveCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  // Toggle wishlist state and sync to cloud DB profile
  const toggleWishlist = async (product: Product) => {
    const isWished = wishlist.some(item => item.id === product.id);
    let updated: Product[];
    if (isWished) {
      updated = wishlist.filter(item => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    saveWishlist(updated);

    // Securely update the registered user Profile with their wishlist choices
    if (user && profile) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          wishlist: updated.map(p => p.id)
        }, { merge: true });
      } catch (err) {
        console.warn("Could not sync user wishlist into cloud storage DB: ", err);
      }
    }
  };

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter(item => item.id !== productId);
    saveWishlist(updated);
  };

  // Collection card scroll focus logic
  const handleCategorySelectFromCollections = (categoryName: string) => {
    // Scroll to products range view
    const curatedRangeSection = document.getElementById('curated-range-view');
    if (curatedRangeSection) {
      curatedRangeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Automatically fill search bar with selected category or trigger specific filter
    setSearchQuery(categoryName);
  };

  const handleHeroShopClick = () => {
    const curatedRangeSection = document.getElementById('curated-range-view');
    if (curatedRangeSection) {
      curatedRangeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simple scroll element helper is highlighted above to about section
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-gray-900 overflow-x-clip antialiased font-sans">
      
      {/* 1. Header component (Pastel pink bar with widgets, search, cart drop-down) */}
      <Header
        cart={cart}
        wishlist={wishlist}
        currentView={currentView}
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        removeFromCart={removeFromCart}
        updateCartQty={updateCartQty}
        removeFromWishlist={removeFromWishlist}
        addToCart={addToCart}
      />

      {/* Main page view dispatcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* Visual Hero Promos row (Header & Nutrition check-points) */}
            <Hero onShopClick={handleHeroShopClick} />

            {/* CURATED RANGE container cards ("THESE SNACKS STACK UP") */}
            <CuratedRange
              products={productsList}
              wishlist={wishlist.map(p => p.id)}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* EXCLUSIVE MAKHANA CANS SECTION */}
            <MakhanaCansSection
              products={productsList}
              wishlist={wishlist.map(p => p.id)}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
                        {/* Twirtles Featured In media press section */}
            <FeaturedIn />

            {/* Frequently Asked Accordions */}

            {/* CHOMPS SCREENSHOT DETAILS & HIGHLIGHTS GRID */}
            <ChompsHighlights onShopClick={handleHeroShopClick} addToCart={addToCart} />

            

            {/* Frequently Asked Accordions */}
            <FAQ />
          </div>
        )}

        {currentView === 'cart' && (
          <div className="animate-fade-in">
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateCartQty={updateCartQty}
              setView={setView}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              couponDiscount={couponDiscount}
              setCouponDiscount={setCouponDiscount}
            />
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="animate-fade-in">
            <CheckoutPage
              cart={cart}
              setView={setView}
              clearCart={clearCart}
              couponCode={couponCode}
              couponDiscount={couponDiscount}
            />
          </div>
        )}

        {currentView === 'account' && (
          <div className="animate-fade-in">
            <AccountPage setView={setView} />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="animate-fade-in">
            <AdminDashboard 
              setView={setView} 
              products={productsList}
              setProducts={setProductsList}
            />
          </div>
        )}

        {currentView === 'about' && (
          <div className="animate-fade-in">
            <AboutPage setView={setView} />
          </div>
        )}
      </main>

      {/* Primary footer layout with back-to-top buttons */}
      <Footer currentView={currentView} setView={setView} />

      {/* Global Neobrutalist Auth Overlays */}
      <AuthModal />
    </div>
  );
}
