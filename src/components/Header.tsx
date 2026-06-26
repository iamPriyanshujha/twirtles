import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, User, X, Plus, Minus, ArrowRight, Compass, BookOpen, Flame, MapPin, Zap, Info, Menu, LogIn, LogOut } from 'lucide-react';
import { CartItem, Product } from '../types';
import ChipPacket from './ChipPacket';
import TwirtlesLogo from './TwirtlesLogo';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  currentView: 'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about' | 'admin';
  setView: (view: 'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, val: number) => void;
  removeFromWishlist: (productId: string) => void;
  addToCart: (product: Product) => void;
}

export default function Header({
  cart,
  wishlist,
  currentView,
  setView,
  searchQuery,
  setSearchQuery,
  removeFromCart,
  updateCartQty,
  removeFromWishlist,
  addToCart,
}: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signIn, signOut, profile, setIsAuthModalOpen, sessionRole } = useAuth();

  const cartTotalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

  return (
    <>
      {/* 0. Top promo announcement ticker with smooth continuous moving animation */}
      <div className="bg-[#8d5438] py-2 border-y-2 border-black overflow-hidden select-none z-50">
        <div className="w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-flex text-[#FAF7F2] font-sans text-[10px] sm:text-[11.5px] tracking-widest uppercase font-black items-center gap-12">
            <span>Use Code Twirtles10 to get additional 10% off  ✨</span>
            <span className="text-[#FFF200] font-black select-none">●</span>
            <span>Use Code Twirtles10 to get additional 10% off  ✨</span>
            <span className="text-[#FFF200] font-black select-none">●</span>
            <span>Use Code Twirtles10 to get additional 10% off  ✨</span>
            <span className="text-[#FFF200] font-black select-none">●</span>
            <span>Use Code Twirtles10 to get additional 10% off  ✨</span>
            <span className="text-[#FFF200] font-black select-none">●</span>
            <span>Use Code Twirtles10 to get additional 10% off  ✨</span>
            <span className="text-[#FFF200] font-black select-none">●</span>
            <span>Use Code Twirtles10 to get additional 10% off  ✨</span>
            <span className="text-[#FFF200] font-black select-none">●</span>
          </div>
        </div>
      </div>

       <header className="sticky top-0 z-50 bg-[#e6ccb2] px-2.5 xs:px-4 md:px-10 py-3.5 md:py-6 text-[#351D14] shadow-xs select-none border-b border-[#E6CCB2]">
        <div className="relative w-full flex items-center justify-between gap-4">
          
          {/* Left Side Navigation wrapper */}
          <div className="flex-1 flex items-center justify-start">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 sm:gap-5 text-sm sm:text-[14px] md:text-base font-sans font-semibold select-none text-[#351D14]">
              <button 
                id="nav-shop-dropdown"
                onClick={() => { setView('home'); }}
                className={`hover:opacity-80 transition-all font-medium py-1 px-0.5 ${
                  currentView === 'home' ? 'text-[#351D14] font-semibold underline underline-offset-4' : 'text-[#351D14]/80'
                }`}
              >
                <span>Home</span>
              </button>



              
              <span className="text-[#351D14]/20 font-light select-none">|</span>
              
             
              <button 
                id="nav-about-btn"
                onClick={() => { setView('about'); }}
                className={`hover:opacity-80 transition-all font-medium py-1 px-0.5 ${
                  currentView === 'about' ? 'text-[#351D14] font-semibold underline underline-offset-4' : 'text-[#351D14]/80'
                }`}
              >
                <span>About</span>
              </button>
            

           


 {/* Keyword Search Input positioned before logo, after about */}
              <div className="relative ml-2">
                <input
                  id="header-search-input"
                  type="text"
                  placeholder="Enter Keyword"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== 'home') {
                      setView('home');
                    }
                  }}
                  className="w-40 lg:w-48 bg-white border border-[#D0C0BC] px-3.5 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide rounded-none focus:outline-none text-[#351D14] placeholder-gray-400 shadow-2xs h-9.5"
                />
                {searchQuery && (
                  <button 
                    id="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-chomps-red hover:text-black font-bold text-sm"
                  >
                    ×
                  </button>
                )}
              </div>
            </nav>
            

            {/* Mobile Hamburger Menu Icon Trigger */}
            <button
              id="mobile-hamburg-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-md hover:bg-[#351D14]/5 flex items-center justify-center text-[#351D14] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>



          








{/* Center Brand Logo - Positioned perfectly in the center, preventing any collision */}
<div 
  id="header-app-logo"
  onClick={() => setView('home')} 
  className="flex-shrink-0 flex items-center justify-center cursor-pointer select-none z-10 mx-auto bg-transparent"
>
  <div className="hover:scale-105 transition-all duration-300 flex items-center justify-center bg-transparent">
    <TwirtlesLogo className="h-[42px] xs:h-7 sm:h-8 md:h-10 lg:h-[62px] w-auto bg-transparent block" />
  </div>
</div>

          {/* Right Side Widgets (Search Input, Wishlist, My Account, My Cart) */}
          <div className="flex-1 flex items-center justify-end gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-6">
            
           

            {/* Wishlist Link - Responsive design */}
            <button
              id="wishlist-trigger-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="text-[#351D14] hover:opacity-80 transition-all font-sans font-semibold flex items-center gap-1.5"
              aria-label="View Wishlist"
            >
              <Heart className="w-5.5 h-5.5 md:w-5 md:h-5 text-[#351D14]" strokeWidth={1.75} />
              <span className="hidden lg:inline text-sm md:text-[15px]">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="bg-[#7C3D3A] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* My Account Link - User Profile or Google Login trigger */}
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  id="account-trigger-btn"
                  onClick={() => setView('account')}
                  className={`text-[#351D14] hover:opacity-80 transition-all font-sans font-semibold flex items-center gap-1.5 ${
                    currentView === 'account' ? 'font-semibold underline underline-offset-4' : ''
                  }`}
                  aria-label="My Account"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-6 h-6 rounded-full border border-chomps-black object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-chomps-red text-white flex items-center justify-center text-xs border border-chomps-black font-bold">
                      {(user.displayName || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden lg:inline text-sm md:text-[15px]">{profile?.displayName || user.displayName || 'My Account'}</span>
                </button>

                {/* Secure Admin Switcher button if administrative privilege is authentic - Hidden on mobile, shown on desktop */}
                {(user.email && ['priyanshujha1402@gmail.com', 'priyanshujha2610@gmail.com'].includes(user.email) || profile?.role === 'admin') && sessionRole === 'admin' && (
                  <button
                    id="header-admin-portal-shortcut"
                    onClick={() => setView('admin')}
                    className={`hidden md:inline-flex bg-black text-[#F2F1E8] hover:bg-[#FAF7F2] hover:text-[#311105] py-1 px-2.5 border border-black text-center font-sans font-extrabold uppercase text-[10px] items-center gap-1 whitespace-nowrap transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 shrink-0 ${
                      currentView === 'admin' ? 'bg-[#7C3D3A] text-white shadow-none translate-x-0.5 translate-y-0.5' : ''
                    }`}
                  >
                    <span>🛡️</span> Admin Mode
                  </button>
                )}

                {/* Direct Logout CTA - Hidden on mobile, shown on desktop */}
                <button
                  id="header-direct-logout-action"
                  onClick={async () => {
                    try {
                      await signOut();
                      setView('home');
                    } catch (e) {
                      console.error("Sign-out failed", e);
                    }
                  }}
                  className="hidden md:inline-block bg-white hover:bg-red-50 text-[#C23B34] py-1 px-2 border-2 border-[#C23B34] font-sans font-black uppercase text-[10px] transition-all shadow-[2px_2px_0px_0px_rgba(194,59,52,0.1)] active:translate-x-0.5 active:translate-y-0.5"
                  title="Logout of session"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="header-google-signin-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white hover:bg-zinc-50 text-[#351D14] px-3 py-1.5 border border-[#351D14] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs"
                title="Sign in with your Google Account"
              >
                <LogIn className="w-3.5 h-3.5 text-chomps-red" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Shop Bag Icon / Mini-Cart Trigger */}
            <div className="relative">
              <button
                id="mini-cart-toggle-btn"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-1.5 hover:opacity-80 transition-all duration-200 outline-none flex items-center"
              >
                <div className="relative flex items-center">
                  <ShoppingBag className="w-5.5 h-5.5 md:w-6 md:h-6 text-[#351D14]" strokeWidth={1.75} />
                  {cartTotalItems > 0 ? (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#7C3D3A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-sans font-bold">
                      {cartTotalItems}
                    </span>
                  ) : (
                    <span className="absolute -top-1.5 -right-1.5 bg-gray-400/40 text-[#351D14] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-sans">
                      0
                    </span>
                  )}
                </div>
              </button>

            {/* Cart Dropdown Overlay (from Screenshot 8) */}
            {isCartOpen && (
              <div 
                id="cart-dropdown-card"
                className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 shadow-xl rounded-none z-50 overflow-hidden"
              >
                <div className="p-3.5 border-b border-gray-100 bg-[#FFF3F2] flex justify-between items-center">
                  <h3 className="font-display font-bold text-sm text-brand-maroon uppercase tracking-wider">Your Bag</h3>
                  <button id="close-cart-dropdown-btn" onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-brand-maroon">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-xs">
                    <ShoppingBag className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    Your cart is currently empty.
                  </div>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                      {cart.map((item) => (
                        <div key={item.product.id} className="p-3 flex gap-3 hover:bg-gray-50 transition-colors">
                          <div className="w-14 h-14 bg-gray-50 border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center">
                            <ChipPacket type={item.product.image} animate={false} className="w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-brand-maroon truncate">{item.product.name}</h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">{item.product.category}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs font-mono font-bold text-gray-800">
                                {item.quantity} × ₹ {item.product.price.toFixed(2)}
                              </span>
                              <div className="flex items-center gap-1.5 border border-gray-200 px-1.5 py-0.5 bg-white">
                                <button 
                                  id={`qty-dec-${item.product.id}`}
                                  onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                                  className="text-gray-500 hover:text-brand-maroon text-[10px]"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="text-[11px] font-mono px-1">{item.quantity}</span>
                                <button 
                                  id={`qty-inc-${item.product.id}`}
                                  onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                                  className="text-gray-500 hover:text-brand-maroon text-[10px]"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            id={`remove-item-${item.product.id}`}
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-[#EF4444]"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-[#FFF0EF]">
                      <div className="flex justify-between text-xs font-bold text-gray-900 mb-3.5">
                        <span className="text-brand-maroon uppercase tracking-wider">Subtotal:</span>
                        <span className="font-mono text-base text-brand-maroon">₹ {cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id="dropdown-view-cart-btn"
                          onClick={() => { setView('cart'); setIsCartOpen(false); }}
                          className="w-full bg-[#E5E7EB] hover:bg-gray-300 text-gray-800 py-2.5 text-xs font-bold text-center uppercase tracking-wider transition-all duration-200"
                        >
                          View Cart
                        </button>
                        <button
                          id="dropdown-checkout-btn"
                          onClick={() => { setView('checkout'); setIsCartOpen(false); }}
                          className="w-full bg-[#5E2626] hover:bg-[#441A1A] text-white py-2.5 text-xs font-bold text-center uppercase tracking-wider transition-all duration-200"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>

      </div>



      {/* Wishlist Drawer Overlay */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-fade-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-maroon fill-brand-maroon" />
                <h3 className="font-display font-extrabold text-lg text-brand-maroon uppercase tracking-wide">
                  My Wishlist ({wishlist.length})
                </h3>
              </div>
              <button id="close-wishlist-btn" onClick={() => setIsWishlistOpen(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y">
              {wishlist.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-sm">No items in your wishlist yet.</p>
                  <button 
                    id="wishlist-shop-now-btn"
                    onClick={() => { setIsWishlistOpen(false); setView('home'); }}
                    className="mt-4 inline-flex items-center gap-2 bg-brand-maroon text-[#FFF] hover:bg-brand-maroon-dark text-xs px-4 py-2 font-bold uppercase tracking-wider transition-all"
                  >
                    Shop Our Range <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="py-4 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-50 p-1 flex-shrink-0 flex items-center justify-center border">
                      <ChipPacket type={product.image} className="w-full h-full" animate={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-brand-maroon truncate">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <p className="text-sm font-mono font-bold text-gray-900 mt-1">₹ {product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                        id={`wishlist-add-cart-${product.id}`}
                        onClick={() => {
                          addToCart(product);
                          setIsWishlistOpen(false);
                        }}
                        className="bg-brand-maroon hover:bg-brand-maroon-dark text-[#FFF] text-[10px] px-3 py-1.5 uppercase font-bold tracking-wider transition-all whitespace-nowrap"
                      >
                        Add To Bag
                      </button>
                      <button
                        id={`wishlist-remove-${product.id}`}
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-gray-400 hover:text-red-600 text-[10px] text-center underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4">
              <button
                id="wishlist-close-footer-btn"
                onClick={() => setIsWishlistOpen(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 font-bold uppercase text-xs tracking-wider transition-all"
              >
                Close Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-start">
          <div className="w-full max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col p-6 animate-fade-in relative border-r-4 border-black font-sans">
            <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-5">
              <div className="flex items-center gap-2">
                <TwirtlesLogo className="h-6 w-auto" />
                <span className="font-display font-black text-sm text-brand-maroon uppercase tracking-widest">Menu</span>
              </div>
              <button 
                id="close-mobile-menu-btn" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-1 hover:bg-black/5 rounded-full text-gray-700 hover:text-black border border-transparent hover:border-black transition-all"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="mb-6 relative">
              <div className="relative">
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Type keyword & search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== 'home') {
                      setView('home');
                    }
                  }}
                  className="w-full bg-white border border-black px-3.5 py-2.5 text-xs font-sans tracking-wide rounded-none focus:outline-none focus:ring-1 focus:ring-black text-[#351D14] placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
                {searchQuery ? (
                  <button 
                    id="mobile-clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-chomps-red hover:text-black font-bold text-sm"
                  >
                    ×
                  </button>
                ) : (
                  <Search className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                )}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-3 text-sm uppercase tracking-wider font-sans font-black text-[#351D14]">
              <button 
                onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2.5 px-2 border-b border-gray-200 flex items-center justify-between group ${
                  currentView === 'home' ? 'bg-[#FFF200]/20 text-[#7C3D3A] border-l-2 border-[#7C3D3A]' : 'text-[#351D14] hover:bg-black/5'
                }`}
              >
                <span>Home</span>
                <span className="text-xs">→</span>
              </button>
              <button 
                onClick={() => { setView('about'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2.5 px-2 border-b border-gray-200 flex items-center justify-between group ${
                  currentView === 'about' ? 'bg-[#FFF200]/20 text-[#7C3D3A] border-l-2 border-[#7C3D3A]' : 'text-[#351D14] hover:bg-black/5'
                }`}
              >
                <span>About</span>
                <span className="text-xs">→</span>
              </button>
              <button 
                onClick={() => { setView('account'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2.5 px-2 border-b border-gray-200 flex items-center justify-between group ${
                  currentView === 'account' ? 'bg-[#FFF200]/20 text-[#7C3D3A] border-l-2 border-[#7C3D3A]' : 'text-[#351D14] hover:bg-black/5'
                }`}
              >
                <span>My Account</span>
                <span className="text-xs">→</span>
              </button>
              <button 
                onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }}
                className="text-left py-2.5 px-2 border-b border-gray-200 flex items-center justify-between text-[#351D14]/80 hover:bg-black/5"
              >
                <span>My Wishlist ({wishlist.length})</span>
                <span className="text-xs">→</span>
              </button>

              {user && (user.email && ['priyanshujha1402@gmail.com', 'priyanshujha2610@gmail.com'].includes(user.email) || profile?.role === 'admin') && sessionRole === 'admin' && (
                <button 
                  onClick={() => { setView('admin'); setIsMobileMenuOpen(false); }}
                  className={`text-left py-2.5 px-2 border-b border-[#F7CDD0] flex items-center justify-between text-chomps-red font-black ${
                    currentView === 'admin' ? 'bg-[#FFF3F2]' : 'hover:bg-[#FFF3F2]/50'
                  }`}
                >
                  <span>🛡️ Admin Mode</span>
                  <span className="text-xs">→</span>
                </button>
              )}

              {user && (
                <button 
                  onClick={async () => {
                    setIsMobileMenuOpen(false);
                    try {
                      await signOut();
                      setView('home');
                    } catch (e) {
                      console.error("Sign-out failed", e);
                    }
                  }}
                  className="text-left py-2.5 px-2 border-b border-gray-200 flex items-center justify-between text-gray-500 hover:bg-black/5"
                >
                  <span>Log Out</span>
                  <span className="text-xs">→</span>
                </button>
              )}
            </nav>

            <div className="absolute bottom-6 left-6 right-6 border-t border-gray-300 pt-4">
              <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase font-black text-center">
                ✨ TWIRTLES SNACKING CO. ✨
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
