import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Check, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

// Import local canister PNGs
import BEETROOT from '../assets/canisters/BEETROOT CHIPS.png';
import creamonion from '../assets/canisters/cream and onion.png';
import HIMALAYAN from '../assets/canisters/HIMALAYAN SALT.png';
import mint from '../assets/canisters/mint can.png';
import OATS from '../assets/canisters/OATS CHIPS.png';
import peri from '../assets/canisters/peri peri can.png';
import ragi from '../assets/canisters/RAGI CHIPS can.png';
import tandoori from '../assets/canisters/TANDOORI.png';

// Fuzzy match lookups to fallback safely if IDs change, supporting dynamic custom paths, local asset folders, and uploaded URLs
const getCanImage = (product: Product): string => {
  if (product.image) {
    const rawImage = product.image;
    const lowerImg = rawImage.toLowerCase();
    // Support custom uploaded base64 data, custom folder assets, local asset paths, or custom server uploads
    if (
      lowerImg.startsWith('data:') || 
      lowerImg.startsWith('blob:') || 
      lowerImg.includes('/assets/') || 
      lowerImg.includes('uploads/') || 
      lowerImg.startsWith('/') ||
      (lowerImg.startsWith('http') && !lowerImg.includes('45154623562-1-scaled.png'))
    ) {
      return rawImage;
    }
  }

  // Fallback to our high-quality cut out canister PNGs
  const normId = product.id.toLowerCase();
  if (normId.includes('cream') || normId.includes('onion')) return creamonion;
  if (normId.includes('salt')) return HIMALAYAN;
  if (normId.includes('mint') || normId.includes('pudeena')) return mint;
  if (normId.includes('peri')) return peri;
  if (normId.includes('tandoori')) return tandoori;
  if (normId.includes('combo')) return OATS;
  if (normId.includes('beetroot')) return BEETROOT;
  return product.image || creamonion; // fallback default
};

interface MakhanaCansSectionProps {
  products: Product[];
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  addToCart: (product: Product) => void;
}

export default function MakhanaCansSection({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
}: MakhanaCansSectionProps) {
  const [justAddedProduct, setJustAddedProduct] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);

  // Filter only Makhana products
  const makhanaCans = products.filter(
    (p) => p.category === 'Flavoured Makhana' || p.id.startsWith('flavoured-makhana-')
  );

  const length = makhanaCans.length;

  const handleNext = () => {
    if (length > 0) {
      setStartIndex((prev) => (prev + 1) % length);
    }
  };

  const handlePrev = () => {
    if (length > 0) {
      setStartIndex((prev) => (prev - 1 + length) % length);
    }
  };

  const handleAddWithFeedback = (product: Product) => {
    addToCart(product);
    setJustAddedProduct(product.id);
    setTimeout(() => {
      setJustAddedProduct(null);
    }, 1200);
  };

  // Helper helper to safely get circular indexes for responsive slider slots
  const getProductAtOffset = (offset: number) => {
    if (length === 0) return null;
    return makhanaCans[(startIndex + offset) % length];
  };

  // Update visible canisters count to 3 per page, sliding on navigation
  const visibleCans = [
    getProductAtOffset(0),
    getProductAtOffset(1),
    getProductAtOffset(2),
  ].filter(Boolean) as Product[];

  const getStickConfig = (product: Product) => {
    const id = product.id.toLowerCase();
    if (id.includes('cream')) {
      return { bg: '#8F1D2C', icon: '🧅', label: 'CREAM & ONION' };
    }
    if (id.includes('salt')) {
      return { bg: '#10B981', icon: '🧂', label: 'HIMALAYAN SALT' };
    }
    if (id.includes('mint')) {
      return { bg: '#1E5E3A', icon: '🌿', label: 'PUDEENA MINT' };
    }
    if (id.includes('peri')) {
      return { bg: '#D90429', icon: '🌶️', label: 'PERI PERI SPICE' };
    }
    if (id.includes('tandoori')) {
      return { bg: '#B45309', icon: '🔥', label: 'TANDOORI TADKA' };
    }
    return { bg: '#351D14', icon: '🍿', label: 'GOLDEN COMBO' };
  };

  return (
    <section 
      id="our-curated-canisters-carousel" 
      className="bg-[#FFFDF9] py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#351D14] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative select-none">
        
        {/* Header styling matches Image exactly */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-4xl sm:text-5.5xl text-[#351D14] uppercase tracking-wider leading-[0.92]">
            OUR CURATED CANISTERS
          </h2>
          <div className="w-24 h-1.5 bg-[#C21111] mx-auto mt-4" />
        </div>

        {/* Carousel Outer frame presenting canisters side-by-side inside square backdrops */}
        <div className="relative px-2 sm:px-12">
          
          {/* Main 3-items layout dynamic grid using the tall stick cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 justify-center max-w-5xl mx-auto">
            {visibleCans.map((product) => {
              const isWished = wishlist.includes(product.id);
              const isJustAdded = justAddedProduct === product.id;
              const config = getStickConfig(product);

              return (
                <div 
                  id={`makhana-stick-column-${product.id}`}
                  key={product.id}
                  className="group flex flex-col items-center bg-[#FFFDF9] p-2 transition-transform duration-300 relative select-none animate-fade-in"
                >
                  {/* Tall physical canister frame - adjusted to look sleek, slender and realistic like the live packaging cylinders */}
                  <div 
                    className="relative w-full max-w-[210px] h-[360px] xs:h-[420px] sm:h-[520px] border-4 border-[#351D14] bg-white text-white select-none shadow-[5px_5px_0px_0px_rgba(53,29,20,1)] group-hover:shadow-[9px_9px_0px_0px_rgba(53,29,20,1)] group-hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-center items-center p-3 text-center rounded-xs"
                  >
                    {/* Background tint pattern corresponding to product flavour */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] opacity-70 pointer-events-none z-0" />
                    <div 
                      className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-xl opacity-20 pointer-events-none z-0" 
                      style={{ backgroundColor: config.bg }}
                    />

                    {/* Imported Official Product canister image (supporting dynamic image source / local folder matching) */}
                    <img
                      src={getCanImage(product)}
                      alt={product.name}
                      className="w-full h-full object-contain select-none z-10 p-1.5 transform group-hover:scale-104 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      draggable={false}
                    />

                    {/* Floaty flavor emoji badge index tab */}
                    <div className="absolute top-3.5 right-3.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white text-xs sm:text-base flex items-center justify-center border-2 border-[#351D14] shadow-[1.5px_1.5px_0px_0px_rgba(53,29,20,1)] z-20">
                      <span>{config.icon}</span>
                    </div>

                    {/* Miniature authentic labeling badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#351D14] text-white px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-widest uppercase border border-[#351D14] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] z-20 whitespace-nowrap">
                      No Palm Oil
                    </div>
                  </div>

                  {/* DETAILS & CONTROLS UNDER STICK */}
                  <div className="w-full text-center mt-3 sm:mt-5 max-w-[210px]">
                    
                    {/* Product Title */}
                    <h3 className="font-display font-black text-[#351D14] text-sm xs:text-base sm:text-2xl uppercase tracking-wider leading-none mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {/* Spice indicator or Tag */}
                    <p className="font-mono text-[8px] sm:text-[10px] text-[#A33F1F] uppercase font-black tracking-widest mb-1.5 sm:mb-2.5 flex items-center justify-center gap-1">
                      <span className="line-clamp-1">★ ROASTED WITH LOVE & VITAMINS</span>
                    </p>

                    {/* Price */}
                    <div className="text-[#C21111] font-mono font-black text-xs sm:text-xl mb-3 sm:mb-4">
                      ₹ {product.price.toFixed(2)}
                    </div>

                    {/* Action Buttons under canister Column */}
                    <div className="flex items-center gap-1.5 sm:gap-2 justify-center">
                      {/* Shop Can Button */}
                      <button
                        id={`makhana-add-to-cart-${product.id}`}
                        onClick={() => handleAddWithFeedback(product)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-3 px-2 sm:px-4 text-[9px] sm:text-xs font-display font-black tracking-widest uppercase transition-all duration-150 border-2 border-[#351D14] rounded-none shadow-[1.5px_1.5px_0px_0px_rgba(53,29,20,1)] sm:shadow-[2px_2px_0px_0px_rgba(53,29,20,1)] ${
                          isJustAdded 
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-none transform translate-x-0.5 translate-y-0.5' 
                            : 'bg-[#C21111] text-white hover:bg-[#351D14]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" /> ADDED
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> SHOP
                          </>
                        )}
                      </button>

                      {/* Heart Toggle */}
                      <button
                        id={`makhana-wishlist-${product.id}`}
                        onClick={() => toggleWishlist(product)}
                        className="p-2 sm:p-3 border-2 border-[#351D14] bg-white hover:bg-rose-50 text-[#351D14] cursor-pointer"
                        title="Add/Remove Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWished ? 'fill-[#C21111] text-[#C21111]' : 'text-gray-500'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Chevrons */}
          {length > 2 && (
            <>
              <button
                id="canister-prev-btn"
                onClick={handlePrev}
                className="hidden sm:flex absolute left-0 top-[40%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 bg-[#351D14] hover:bg-[#C21111] border-2 border-[#351D14] rounded-none items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[#FAF7F2] cursor-pointer"
                title="Slide Left"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                id="canister-next-btn"
                onClick={handleNext}
                className="hidden sm:flex absolute right-0 top-[40%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 bg-[#351D14] hover:bg-[#C21111] border-2 border-[#351D14] rounded-none items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[#FAF7F2] cursor-pointer"
                title="Slide Right"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Mobile indicator and navigation controls for smaller screens */}
          {length > 0 && (
            <div className="flex sm:hidden items-center justify-center gap-5 mt-8 select-none">
              <button
                id="mobile-canister-prev-btn"
                onClick={handlePrev}
                className="p-3.5 bg-[#351D14] hover:bg-[#C21111] text-white transition-colors cursor-pointer rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                title="Slide Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-sans font-black text-xs uppercase tracking-widest text-[#351D14]">
                {startIndex + 1} OF {length}
              </span>
              <button
                id="mobile-canister-next-btn"
                onClick={handleNext}
                className="p-3.5 bg-[#351D14] hover:bg-[#C21111] text-white transition-colors cursor-pointer rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                title="Slide Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
