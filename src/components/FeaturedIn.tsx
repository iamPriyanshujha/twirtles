import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Marquee from './Marquee';

// Import the 7 local images from the srcassets directory
import feat1 from '../assets/images/feat1.jpg';
import feat2 from '../assets/images/feat2.jpg';
import feat3 from '../assets/images/feat3.jpg';
import feat4 from '../assets/images/feat4.jpg';
import feat5 from '../assets/images/feat5.jpg';
import feat6 from '../assets/images/feat6.jpg';
import feat7 from '../assets/images/feat7.jpg';

const FEATURE_IMAGES = [feat1, feat2, feat3, feat4, feat5, feat6, feat7];

export default function FeaturedIn() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? FEATURE_IMAGES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === FEATURE_IMAGES.length - 1 ? 0 : prev + 1));
  };

  // Get active subset of 3 images for a dynamic continuous slider
  const getVisibleImages = () => {
    const len = FEATURE_IMAGES.length;
    return [
      FEATURE_IMAGES[activeIndex],
      FEATURE_IMAGES[(activeIndex + 1) % len],
      FEATURE_IMAGES[(activeIndex + 2) % len],
    ];
  };

  const visibleImages = getVisibleImages();

  return (
    <section id="media-press-features-view" className="bg-[#FAF7F2] pt-0 pb-16 border-b-4 border-[#351D14]">
      
      {/* Top Separator Marquee */}
      <Marquee 
        items={[
          'Snack Revolution: Twirtles Redefine the Future of Indulgence',
          'Step into the future of snacking with Twirtles ⚡️',
          'Embrace the next generation of snacking with Twirtles',
          'Baked Multi-Grain Superpuffs Fortified with Vitamin C and Zinc ✨',
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-12">
        
        {/* Simple Section Header */}
        <div className="text-center mb-8">
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-[#351D14] tracking-widest uppercase mb-3">
            Twirtles Featured Gallery
          </h2>
          <div className="w-16 h-1 bg-[#C21111] mx-auto rounded-full" />
        </div>

        {/* Carousel Frames Container */}
        <div className="relative px-2 md:px-12">
          
          {/* Row of 3 highly compact, cute, larger images with delicate branding margins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch pt-2 pb-4 max-w-4xl mx-auto">
            {visibleImages.map((imageUrl, idx) => {
              // Responsive visibility logic:
              // Index 0: always block
              // Index 1: block on small screen and above (sm:block)
              // Index 2: block on medium and above (md:block)
              const responsiveClass = idx === 0 
                ? 'block' 
                : idx === 1 
                  ? 'hidden sm:block' 
                  : 'hidden md:block';

              return (
                <div 
                  id={`feature-image-frame-${idx}`}
                  key={`${imageUrl}-${idx}`}
                  className={`${responsiveClass} aspect-[13/4.5] w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] mx-auto bg-white border-2 border-[#351D14] shadow-[4px_4px_0px_0px_rgba(53,29,20,1)] hover:shadow-[6px_6px_0px_0px_rgba(53,29,20,1)] transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden rounded-xs flex items-center justify-center`}
                >
                  <img
                    src={imageUrl}
                    alt={`Twirtles Feature ${activeIndex + idx + 1}`}
                    className="w-full h-full object-contain p-2.5 select-none"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button */}
          <button
            id="press-slide-prev"
            onClick={prevSlide}
            className="absolute left-[-10px] md:left-[-4px] top-1/2 -translate-y-1/2 p-2.5 bg-[#351D14] hover:bg-[#C21111] text-white hover:scale-105 transition-all cursor-pointer z-10 border-2 border-[#351D14] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none"
            aria-label="Previous Feature Image"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            id="press-slide-next"
            onClick={nextSlide}
            className="absolute right-[-10px] md:right-[-4px] top-1/2 -translate-y-1/2 p-2.5 bg-[#351D14] hover:bg-[#C21111] text-white hover:scale-105 transition-all cursor-pointer z-10 border-2 border-[#351D14] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none"
            aria-label="Next Feature Image"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

        {/* Carousel indicator dots / pagination (7 dots total) */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          {FEATURE_IMAGES.map((_, idx) => (
            <button
              id={`press-dot-${idx}`}
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-none border-2 border-[#351D14] cursor-pointer ${
                activeIndex === idx ? 'bg-[#C21111] w-6' : 'bg-gray-300 w-2'
              }`}
              title={`Go to image ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
