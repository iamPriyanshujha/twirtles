import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="customer-testimonials-view" className="bg-chomps-black py-16 px-4 md:px-8 border-b-4 border-chomps-red">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-chomps-black bg-chomps-yellow border-2 border-chomps-black px-4 py-1.5 rounded-none shadow-sm">
            REAL SNACKERS, REAL WORDS
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-widest uppercase mt-6">
            Trusted By Fitness Lovers
          </h2>
          <div className="w-24 h-1.5 bg-chomps-red mx-auto mt-3" />
        </div>

        {/* 2 testimo grid (matching Screenshot 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              id={`testimonial-card-${idx}`}
              key={item.name}
              className="bg-white text-chomps-black border-2 border-chomps-black p-6 sm:p-8 flex flex-col justify-between relative group hover:shadow-[8px_8px_0px_0px_rgba(255,242,0,1)] shadow-[4px_4px_0px_0px_rgba(255,242,0,1)] hover:-translate-y-1 transform transition-all duration-200 rounded-none text-center"
            >
              {/* Quote bubble absolute icon */}
              <div className="absolute top-4 right-4 text-chomps-red/10 group-hover:text-chomps-red/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-xs sm:text-sm font-sans italic leading-relaxed z-10 font-normal">
                "{item.text}"
              </p>

              {/* Stars & Author elements */}
              <div className="mt-8 flex flex-col items-center">
                {/* 5-star ratings (Screenshot 6 alignment) */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-chomps-orange text-chomps-orange" strokeWidth={1} />
                  ))}
                </div>

                <h4 className="font-display font-normal text-chomps-black text-2xl tracking-wider uppercase">
                  {item.name}
                </h4>
                
                <span className="text-[10px] text-gray-400 font-mono font-bold mt-1">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer trust banner */}
        <div className="mt-12 text-center bg-chomps-red text-white border-2 border-chomps-black p-5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 rounded-none shadow-md transform skew-x-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-chomps-yellow border border-chomps-black animate-pulse" />
            <span className="text-xs font-sans font-black uppercase tracking-widest text-white">100% Roasted Golden Grains</span>
          </div>
          <div className="hidden sm:block text-chomps-yellow font-black">|</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-chomps-yellow border border-chomps-black animate-pulse" />
            <span className="text-xs font-sans font-black uppercase tracking-widest text-white">High Plant Protein</span>
          </div>
          <div className="hidden sm:block text-chomps-yellow font-black">|</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-chomps-yellow border border-chomps-black animate-pulse" />
            <span className="text-xs font-sans font-black uppercase tracking-widest text-white">Absolutely Zero Palm Oil</span>
          </div>
        </div>

      </div>
    </section>
  );
}
