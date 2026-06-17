import React, { useState } from 'react';
import { FAQS } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-accordions-view" className="bg-[#B08968] py-20 px-4 md:px-8 text-[#351D14] border-b-4 border-[#351D14] border-t-4 border-[#351D14]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Accordion panels (Chomps sharp outline style with heavy card shadow) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                id={`faq-item-card-${idx}`}
                key={idx}
                className="bg-[#FAF7F2] text-[#351D14] border-2 border-[#351D14] border-l-[8px] border-l-[#8d5438] shadow-[4px_4px_0px_0px_rgba(53,29,20,1)] select-none transition-all duration-300 rounded-none font-food"
              >
                {/* Trigger button header */}
                <button
                  id={`faq-trigger-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 outline-none group cursor-pointer"
                >
                  <span className="font-food-heavy text-lg sm:text-xl tracking-wider text-[#351D14] group-hover:text-[#8d5438] transition-colors uppercase">
                    {item.question}
                  </span>
                  
                  <span className="flex-shrink-0 bg-[#8d5438] text-[#FAF7F2] p-2 border border-[#351D14] rounded-none group-hover:bg-[#351D14] transition-colors">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                    ) : (
                      <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                    )}
                  </span>
                </button>

                {/* Collapsible Answer container */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t-2 border-[#351D14]/10 text-sm text-[#351D14]/85 leading-relaxed font-food mt-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Big outline stylized italic header */}
        <div className="lg:col-span-12 xl:col-span-5 text-center xl:text-left flex flex-col justify-center select-none xl:pl-6 leading-none">
          <div className="inline-flex items-center gap-2 text-[#8d5438] text-xs font-food-space font-black uppercase tracking-widest mb-3 justify-center xl:justify-start">
            <HelpCircle className="w-4 h-4 animate-bounce text-[#8d5438]" />
            <span>Got Doubts? We Have Answers</span>
          </div>

          <h2 className="font-food-heavy text-[#351D14] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] uppercase tracking-normal">
            Frequently
            <span className="block text-[#8d5438] mt-2">Asked</span>
            <span className="block text-[#7C3D3A] mt-2">
              Questions
            </span>
          </h2>

          <p className="text-[#351D14]/85 text-base font-food max-w-sm mt-6 leading-relaxed">
            Can’t find what you’re looking for? Shoot our customer support squad a line at{' '}
            <a href="mailto:priyanshujha1402@gmail.com" className="underline font-bold text-[#8d5438] hover:text-[#351D14] transition-colors">
              support@twirtles.com
            </a>{' '}
            and we’ll get right back to you!
          </p>
        </div>

      </div>
    </section>
  );
}
