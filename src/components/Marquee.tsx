import React from 'react';

interface MarqueeProps {
  bgClass?: string;
  textClass?: string;
  items?: string[];
}

const DEFAULT_ITEMS = [
  'India’s First Protein chips fortified with vitamins & Minerals',
  'India’s First Protein chips fortified with vitamins & Minerals',
  'India’s First Protein chips fortified with vitamins & Minerals',
];

export default function Marquee({ 
  bgClass = "bg-[#8d5438] py-2 border-y-2 border-black overflow-hidden", 
  textClass = "text-[#FAF7F2] font-sans text-[10px] sm:text-[11px] tracking-widest uppercase font-black",
  items = DEFAULT_ITEMS 
}: MarqueeProps) {
  // Combine items to make a continuous stream
  const content = [...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden ${bgClass}`}>
      <div className="relative flex items-center overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {content.map((text, idx) => (
            <span key={idx} className={`${textClass} inline-flex items-center gap-6`}>
              <span>{text}</span>
              <span className="text-[#FFF200] font-black select-none">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
