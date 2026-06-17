import React, { useState } from 'react';
import { Heart, RefreshCw, Star, ShoppingCart, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Product } from '../types';
import ChipPacket from './ChipPacket';

// Import local canister PNGs
import BEETROOT from '../assets/canisters/BEETROOT CHIPS.png';
import creamonion from '../assets/canisters/cream and onion.png';
import HIMALAYAN from '../assets/canisters/HIMALAYAN SALT.png';
import mint from '../assets/canisters/mint can.png';
import OATS from '../assets/canisters/OATS CHIPS.png';
import peri from '../assets/canisters/peri peri can.png';
import ragi from '../assets/canisters/RAGI CHIPS can.png';
import tandoori from '../assets/canisters/TANDOORI.png';

const getCanImage = (product: Product): string => {
  if (product.image) {
    const rawImage = product.image;
    const lowerImg = rawImage.toLowerCase();
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

  const normId = product.id.toLowerCase();
  if (normId.includes('cream') || normId.includes('onion')) return creamonion;
  if (normId.includes('salt')) return HIMALAYAN;
  if (normId.includes('mint') || normId.includes('pudeena')) return mint;
  if (normId.includes('peri')) return peri;
  if (normId.includes('tandoori')) return tandoori;
  if (normId.includes('combo')) return OATS;
  if (normId.includes('beetroot')) return BEETROOT;
  return product.image || creamonion;
};

interface CuratedRangeProps {
  products: Product[];
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  addToCart: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CuratedRange({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
  searchQuery,
  setSearchQuery,
}: CuratedRangeProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [page, setPage] = useState<number>(0);
  const [justAddedProduct, setJustAddedProduct] = useState<string | null>(null);
  const [comparedProduct, setComparedProduct] = useState<Product | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    setPage(0);
  }, [searchQuery, activeCategory]);

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Superpuffs', 'Ragi Chips', 'Quinoa Chips', 'Oats Chips', 'Flavoured Makhana', 'Beetroot Chips'];
  const itemsPerPage = isMobile ? 2 : 4;

  const handleNext = () => {
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (totalPages > 1) {
      setPage((prev) => (prev + 1) % totalPages);
    }
  };

  const handlePrev = () => {
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (totalPages > 1) {
      setPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  const startIndex = page * itemsPerPage;
  const visibleProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleAddWithFeedback = (product: Product) => {
    addToCart(product);
    setJustAddedProduct(product.id);
    setTimeout(() => {
      setJustAddedProduct(null);
    }, 1500);
  };

  const getPhotoshootBackdrop = (product: Product) => {
    switch (product.image) {
      case 'red-tomato':
        return { bg: '#FEE2E2', elements: <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 to-transparent pointer-events-none" /> };
      case 'ragi-bag':
        return { bg: '#FEF3C7', elements: <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 to-transparent pointer-events-none" /> };
      case 'ragi-peri-jar':
        return { bg: '#FFEDD5', elements: <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/5 to-transparent pointer-events-none" /> };
      case 'green-onion':
        return { bg: '#D1FAE5', elements: <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" /> };
      case 'quinoa-jar':
        return { bg: '#CCFBF1', elements: <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-transparent pointer-events-none" /> };
      case 'oats-bag':
        return { bg: '#FEF3C7', elements: <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" /> };
      case 'beetroot-bag':
        return { bg: '#EDE0D4', elements: <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-transparent pointer-events-none" /> };
      case 'makhana-can-cream':
        return { bg: '#E2EBE9', elements: <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/5 to-transparent pointer-events-none" /> };
      case 'makhana-can-salt':
        return { bg: '#E2ECF1', elements: <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/5 to-transparent pointer-events-none" /> };
      case 'makhana-can-mint':
        return { bg: '#E2EFE4', elements: <div className="absolute inset-0 bg-gradient-to-tr from-[#1E5E3A]/5 to-transparent pointer-events-none" /> };
      case 'makhana-can-peri':
        return { bg: '#FBECE3', elements: <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/5 to-transparent pointer-events-none" /> };
      case 'makhana-can-tandoori':
        return { bg: '#F7EADE', elements: <div className="absolute inset-0 bg-gradient-to-tr from-[#B45309]/5 to-transparent pointer-events-none" /> };
      default:
        return { bg: '#F5F2EA', elements: <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" /> };
    }
  };

  return (
    <section id="curated-range-view" className="py-16 bg-[#FAF7F2] px-4 md:px-8 border-b-4 border-chomps-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-6">
          <h2 className="font-display font-black text-5xl md:text-6.5xl text-chomps-black tracking-widest uppercase leading-none">
            These Snacks Stack Up
          </h2>
          <p className="font-sans font-bold text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto uppercase mt-3 tracking-wide">
            {viewMode === 'slider' 
              ? "Who said snacks need to be complicated? Stick to the basics: 0g sugar and plenty of protein, in a range of Chompable flavors."
              : "Bite into our delicious, high protein chips or crispy puffs. Stack up on what fits, loaded to fuel your busy day with absolute clean nutrition."
            }
          </p>
          <div className="w-24 h-1.5 bg-chomps-red mx-auto mt-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <div className="inline-flex bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none">
            <button 
              onClick={() => { setViewMode('slider'); setPage(0); }}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-sans font-black tracking-wide uppercase transition-all rounded-none cursor-pointer ${
                viewMode === 'slider' ? 'bg-[#8d5438] text-white' : 'text-black bg-white hover:bg-[#ffcad0]/30 font-bold'
              }`}
            >
              🚀 Canister & Pack Slider
            </button>
            <button 
              onClick={() => { setViewMode('grid'); setPage(0); }}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-sans font-black tracking-wide uppercase transition-all rounded-none cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#8d5438] text-white' : 'text-black bg-white hover:bg-[#ffcad0]/30 font-bold'
              }`}
            >
              ▦ Traditional Grid Catalog
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(0); }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-extrabold transition-all border-2 border-chomps-black rounded-none ${
                activeCategory === cat ? 'bg-chomps-red text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-chomps-black hover:bg-chomps-yellow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500 border-4 border-chomps-black bg-white max-w-lg mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-sm font-bold text-chomps-black uppercase tracking-wider">No products match your filters.</p>
            </div>
          ) : (
            <>
              {viewMode === 'slider' ? (
                <div className="flex flex-col gap-8 w-full">
                  {/* items-stretch applied here ensures columns share identical heights */}
                  <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 sm:gap-6 transition-all duration-300 items-stretch">
                    {(filtered.length <= itemsPerPage ? filtered : visibleProducts).map((product) => {
                      const isWished = wishlist.includes(product.id);
                      const isJustAdded = justAddedProduct === product.id;
                      const backdrop = getPhotoshootBackdrop(product);
                      const isCanister = product.category === 'Flavoured Makhana' || product.id.startsWith('flavoured-makhana-');
                      const isCustomImg = product.image && !isCanister && (product.image.startsWith('http') || product.image.startsWith('data:') || product.image.includes('/') || product.image.includes('.'));

                      return (
                        <div 
                          key={product.id}
                          className="flex flex-col bg-white border-2 border-chomps-black p-4 w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                        >
                          {/* Uniform Image Frame Container */}
                          <div className="relative w-full aspect-square border border-neutral-200 flex items-center justify-center overflow-hidden mb-4 bg-neutral-50 rounded-none">
                            {isCanister ? (
                              <>
                                <div className="absolute inset-0" style={{ backgroundColor: backdrop.bg || '#F7EADE' }} />
                                {backdrop.elements}
                                <img 
                                  src={getCanImage(product)} 
                                  alt={product.name}
                                  className="h-36 sm:h-44 w-auto max-w-[90%] object-contain z-10 select-none transform hover:scale-105 transition-transform duration-300"
                                  draggable={false}
                                />
                              </>
                            ) : (
                              <>
                                <div className="absolute inset-0" style={{ backgroundColor: backdrop.bg || '#F5F2EA' }} />
                                {backdrop.elements}
                                <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                                  <ChipPacket 
                                    type={isCustomImg ? product.image : product.image} 
                                    className="w-full h-full max-h-[160px] object-contain" 
                                    animate={false} 
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {/* Content Wrapper pushed downward equally */}
                          <div className="flex flex-col flex-grow justify-between text-left">
                            <div>
                              <h3 className="font-display font-black text-chomps-black text-lg uppercase tracking-wider leading-tight line-clamp-1 mb-1">
                                {product.name}
                              </h3>

                              <div className="min-h-[36px] mb-2">
                                {product.description && (
                                  <p className="text-[11px] text-gray-400 font-bold leading-normal line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-0.5 my-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-chomps-yellow text-chomps-yellow" strokeWidth={0} />
                                ))}
                              </div>
                            </div>

                            {/* Action rows pinned systematically to base line alignment */}
                            <div className="mt-auto">
                              <div className="flex items-center justify-between w-full mb-3">
                                <span className="text-chomps-black font-sans font-black text-lg">
                                  ₹ {product.price.toFixed(2)}
                                </span>
                                <button
                                  onClick={() => toggleWishlist(product)}
                                  className="p-1 hover:bg-neutral-100 rounded-full text-gray-500"
                                >
                                  <Heart className={`w-4 h-4 ${isWished ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
                                </button>
                              </div>

                              <button
                                onClick={() => handleAddWithFeedback(product)}
                                className={`w-full py-2.5 text-xs font-sans font-black tracking-widest uppercase transition-colors border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                  isJustAdded ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-black hover:bg-chomps-red text-white'
                                }`}
                              >
                                {isJustAdded ? 'ADDED' : 'ADD TO CART'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filtered.length > itemsPerPage && (
                    <div className="flex items-center justify-center gap-4 mt-4 select-none">
                      <button
                        onClick={handlePrev}
                        className="p-2 bg-chomps-black hover:bg-chomps-red text-white border-2 border-chomps-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="font-sans font-black text-xs uppercase tracking-widest text-chomps-black">
                        PAGE {page + 1} OF {Math.ceil(filtered.length / itemsPerPage)}
                      </span>
                      <button
                        onClick={handleNext}
                        className="p-2 bg-chomps-black hover:bg-chomps-red text-white border-2 border-chomps-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* --- B. TRADITIONAL GRID VIEW --- */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                  {filtered.map((product) => {
                    const isWished = wishlist.includes(product.id);
                    const isJustAdded = justAddedProduct === product.id;
                    const isCanister = product.category === 'Flavoured Makhana' || product.id.startsWith('flavoured-makhana-');
                    const isCustomImg = product.image && !isCanister && (product.image.startsWith('http') || product.image.startsWith('data:') || product.image.includes('/') || product.image.includes('.'));

                    return (
                      <div 
                        key={product.id} 
                        className="group flex flex-col bg-white border-2 border-chomps-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                      >
                        {isCanister ? (
                          <div className={`p-6 ${product.colorTheme.bg || 'bg-amber-950/10'} flex items-center justify-center relative min-h-[220px] max-h-[220px] overflow-hidden border-b border-neutral-100`}>
                            <img 
                              src={getCanImage(product)} 
                              alt={product.name}
                              className="h-40 w-auto max-w-full object-contain z-10 transform group-hover:scale-105 transition-transform duration-300"
                              draggable={false}
                            />
                          </div>
                        ) : (
                          <div className={`p-6 ${product.colorTheme.bg || 'bg-white'} flex items-center justify-center relative min-h-[220px] max-h-[220px] border-b border-neutral-100`}>
                            <ChipPacket type={product.image} className="w-full h-full max-h-[150px] object-contain drop-shadow-lg scale-95 group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display font-normal text-chomps-black text-2xl uppercase tracking-wider line-clamp-1">
                              {product.name}
                            </h3>

                            <div className="min-h-[36px] my-2">
                              {product.description && (
                                <p className="text-xs text-gray-400 font-semibold leading-relaxed line-clamp-2 text-left">
                                  {product.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-0.5 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-chomps-orange text-chomps-orange" strokeWidth={0} />
                              ))}
                              <span className="text-[10px] text-gray-500 font-mono font-bold pl-1.5">(4.9)</span>
                            </div>

                            <div className="text-chomps-red font-mono font-black text-lg mb-4 text-left">
                              ₹ {product.price.toFixed(2)}
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-100 mt-auto">
                            <button
                              onClick={() => handleAddWithFeedback(product)}
                              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm uppercase tracking-wide font-display font-bold border-2 border-chomps-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                isJustAdded ? 'bg-emerald-600 text-white' : 'bg-chomps-black text-white hover:bg-chomps-red'
                              }`}
                            >
                              {isJustAdded ? 'ADDED' : 'ADD TO BAG'}
                            </button>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleWishlist(product)}
                                className="p-2 border border-neutral-200 bg-white hover:bg-red-50"
                              >
                                <Heart className={`w-4 h-4 ${isWished ? 'fill-[#EF4444] text-[#EF4444]' : 'text-gray-500'}`} />
                              </button>
                              <button
                                onClick={() => setComparedProduct(product)}
                                className="p-2 border border-neutral-200 bg-white hover:bg-amber-50 text-gray-500"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {comparedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FAF7F2] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-sans relative">
            <button onClick={() => setComparedProduct(null)} className="absolute top-4 right-4 text-gray-700 hover:text-black"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 border-b-2 border-black pb-3 mb-4"><span className="text-2xl">🌱</span><h3 className="font-display font-black text-sm uppercase tracking-wider">TWIRTLES COMPARISON</h3></div>
            <div className="mb-4 text-left"><h4 className="font-display font-black text-lg uppercase tracking-wide">{comparedProduct.name}</h4></div>
            <button onClick={() => setComparedProduct(null)} className="w-full py-3 bg-black hover:bg-chomps-red text-white uppercase text-xs tracking-widest font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">GOT IT!</button>
          </div>
        </div>
      )}
    </section>
  );
}