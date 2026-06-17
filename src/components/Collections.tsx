import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data';
import ChipPacket from './ChipPacket';

interface CollectionsProps {
  onCategorySelect: (category: string) => void;
}

export default function Collections({ onCategorySelect }: CollectionsProps) {
  return (
    <section id="collections-categories-view" className="py-16 bg-chomps-cream px-4 md:px-8 border-b-4 border-chomps-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-white bg-chomps-black border-2 border-chomps-black px-4 py-1.5 rounded-none shadow-sm">
            EXPLORE COLLECTIONS
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-chomps-black tracking-widest uppercase mt-5">
            Delicious Flavours For Every Craving
          </h2>
          <div className="w-24 h-1.5 bg-chomps-red mx-auto mt-3" />
        </div>

        {/* 6 Grid layout (matching Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              id={`collection-cat-card-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={cat.name}
              onClick={() => onCategorySelect(cat.name)}
              className="group cursor-pointer relative bg-white border-2 border-chomps-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform transition-all duration-200 flex flex-col justify-between h-[280px]"
            >
              {/* Overlay elements like circle arrow */}
              <div className="absolute top-4 right-4 bg-white/90 border-2 border-chomps-black group-hover:bg-chomps-red group-hover:text-white p-2.5 rounded-none transition-colors z-10">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45 text-chomps-black group-hover:text-white" />
              </div>

              {/* Graphical Top background */}
              <div className="flex-1 w-full relative flex items-center justify-center p-4 bg-chomps-cream/30">
                <ChipPacket type={cat.image} className="w-full h-full scale-100 group-hover:scale-105 transition-transform duration-500" animate={false} />
              </div>

              {/* Bottom text overlays matching Screenshot 3 */}
              <div className="p-4 bg-white border-t-2 border-chomps-black flex justify-between items-center z-10">
                <div>
                  <h3 className="font-display font-normal text-chomps-black text-2xl uppercase tracking-wider">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono font-bold mt-0.5">{cat.count}</p>
                </div>
                
                <span className="text-[10px] font-extrabold text-white bg-chomps-red border-2 border-chomps-black px-3 py-1.5 uppercase tracking-wider rounded-none shadow-sm hover:bg-chomps-yellow hover:text-chomps-black transition-colors">
                  Shop Now
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
