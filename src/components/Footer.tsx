import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin, Heart, Shield, X } from 'lucide-react';
import TwirtlesLogo from './TwirtlesLogo';

interface FooterProps {
  currentView: string;
  setView: (view: 'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about') => void;
}

export default function Footer({ currentView, setView }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'cancel' | 'privacy' | null>(null);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#B08968] text-[#351D14] pt-16 pb-10 border-t-4 border-[#8d5438] relative font-sans">
      
      {/* Primary footer layout matching modern premium web header colors */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & Company introduction */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer max-w-fit" onClick={() => setView('home')}>
            <div className="bg-[#FAF7F2] px-3 py-1.5 border-2 border-[#351D14] shadow-[2px_2px_0px_0px_rgba(53,29,20,1)] rounded-xs mr-1">
              <TwirtlesLogo className="h-6 w-auto" />
            </div>
          </div>
          
          <p className="text-xs text-[#351D14]/80 leading-relaxed max-w-sm font-medium">
            Twirtles offers a diverse range of healthy snacks packed with protein to keep you energized all day. From our delightful chips to our crunchy makhanas, every snack is designed to satisfy cravings without compromising on health.
          </p>

          {/* Approved payment methods */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white text-[#351D14] border-2 border-[#351D14] px-2.5 py-1 text-[10px] font-black tracking-wider rounded-none" title="Visa Cards Approved">
              VISA
            </span>
            <span className="bg-white text-[#EA3323] border-2 border-[#351D14] px-2.5 py-1 text-[10px] font-black tracking-wider rounded-none" title="Mastercard Approved">
              MASTERCARD
            </span>
            <span className="bg-white text-purple-800 border-2 border-[#351D14] px-2.5 py-1 text-[10px] font-black tracking-wider rounded-none" title="UPI Approved">
              UPI
            </span>
          </div>
        </div>

        {/* Column 2: INFORMATION Links */}
        <div>
          <h3 className="font-food-space font-black text-sm text-[#8d5438] uppercase tracking-wider mb-5">
            Information
          </h3>
          <ul className="flex flex-col gap-2.5 text-xs text-[#351D14]/90 font-bold uppercase tracking-wider">
            <li>
              <button 
                id="footer-info-about"
                onClick={() => {
                  setView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#8d5438] hover:underline transition-colors text-left font-bold"
              >
                About
              </button>
            </li>
            <li>
              <button 
                id="footer-info-contact"
                onClick={() => {
                  setView('home');
                  setTimeout(() => {
                    const e = document.getElementById('media-press-features-view');
                    if (e) e.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hover:text-[#8d5438] hover:underline transition-colors text-left font-bold"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button 
                id="footer-info-cancel"
                onClick={() => setActiveModal('cancel')} 
                className="hover:text-[#8d5438] hover:underline transition-colors text-left font-bold"
              >
                Cancellation
              </button>
            </li>
            <li>
              <button 
                id="footer-info-privacy"
                onClick={() => setActiveModal('privacy')} 
                className="hover:text-[#8d5438] hover:underline transition-colors text-left font-bold"
              >
                Privacy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: CONNECT WITH US Links */}
        <div>
          <h3 className="font-food-space font-black text-sm text-[#8d5438] uppercase tracking-wider mb-5">
            Connect With Us
          </h3>
          <ul className="flex flex-col gap-2.5 text-xs text-[#351D14]/90 font-bold uppercase tracking-wider">
            <li><a href="https://www.instagram.com/twirtles_" target="_blank" rel="noreferrer" className="hover:text-[#8d5438] transition-colors hover:underline">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#8d5438] transition-colors hover:underline">LinkedIn</a></li>
          </ul>
        </div>

        {/* Column 4: HELP Links */}
        <div>
          <h3 className="font-food-space font-black text-sm text-[#8d5438] uppercase tracking-wider mb-5">
            Help
          </h3>
          <ul className="flex flex-col gap-2.5 text-xs text-[#351D14]/90 font-bold uppercase tracking-wider mb-4">
            <li>
              <button 
                id="footer-help-faqs"
                onClick={() => {
                  setView('home');
                  setTimeout(() => {
                    const e = document.getElementById('faq-accordions-view');
                    if (e) e.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hover:text-[#8d5438] hover:underline transition-colors text-left font-bold"
              >
                Faqs
              </button>
            </li>
            <li>
              <button 
                id="footer-help-shop"
                onClick={() => {
                  setView('home');
                  setTimeout(() => {
                    const e = document.getElementById('curated-range-view');
                    if (e) e.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hover:text-[#8d5438] hover:underline transition-colors text-left font-bold"
              >
                Shop
              </button>
            </li>
          </ul>

          {/* Quick email support details */}
          <div className="mt-4 bg-[#FAF7F2] p-4 text-[11px] border-2 border-[#8d5438] text-[#351D14] rounded-none shadow-md">
            <h4 className="font-food-space font-black text-xs text-[#8d5438] uppercase mb-1">Customer Support</h4>
            <p className="flex items-center gap-1.5 mt-2 font-bold"><Mail className="w-3.5 h-3.5 text-[#8d5438]" /> support@twirtles.com</p>
            <p className="flex items-center gap-1.5 mt-1 font-bold"><Phone className="w-3.5 h-3.5 text-[#8d5438]" />+91 8957560093</p>
          </div>
        </div>

      </div>

      {/* Floating/Bottom Back-to-Top Button Box */}
      <button
        id="footer-back-to-top-btn"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-chomps-red hover:bg-[#FAF7F2] text-white hover:text-chomps-red p-3.5 shadow-2xl z-40 transition-colors active:scale-95 duration-200 border-2 border-[#351D14] rounded-none"
        title="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5 font-black" />
      </button>

      {/* Deep Bottom Disclaimer Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-14 pt-6 border-t border-[#351D14]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#351D14]/70 font-mono font-bold">
        <p>© {new Date().getFullYear()} Twirtles Snacking Pvt. Ltd. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-2.5 h-2.5 text-chomps-red fill-chomps-red animate-pulse" /> in India. Certified Gluten-Free & Baked. 
          <span className="flex items-center gap-1 text-[#351D14] pl-1.5 font-bold"><Shield className="w-3.5 h-3.5 text-[#8d5438]" /> FSSAI Approved</span>
        </p>
      </div>

      {/* Footer Neobrutalist Information Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FAF7F2] border-4 border-[#351D14] p-6 shadow-[8px_8px_0px_0px_rgba(53,29,20,1)] font-sans relative text-[#351D14] text-left">
            <button
              id="close-footer-modal"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 hover:bg-black/5 rounded-full text-gray-700 hover:text-black border border-transparent hover:border-black transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            <div className="flex items-center gap-3 border-b-2 border-black pb-3 mb-4">
              <span className="text-2xl animate-bounce">🐢</span>
              <h3 className="font-food-space font-black text-xs uppercase tracking-wider text-black">
                {activeModal === 'cancel' ? 'Cancellation Policy' : 'Privacy Agreement'}
              </h3>
            </div>

            <div className="my-6 text-xs sm:text-sm leading-relaxed text-[#351D14]/90 font-medium">
              {activeModal === 'cancel' ? (
                <p>
                  Cancellations are accepted within 3 hours of order placement. To cancel your orders, please email us directly with your order ID at <span className="bg-[#FAF7F2] border-2 border-[#8d5438] text-black font-mono font-bold px-1.5 py-0.5">support@twirtles.com</span> or WhatsApp our help desk at <span className="bg-[#FAF7F2] border-2 border-[#8d5438] text-black font-mono font-bold px-1.5 py-0.5">+91 98765 43210</span>.
                </p>
              ) : (
                <p>
                  Your privacy is our core ingredient! We protect your snack queries, address logs, credentials, and payment routes via full sandbox end-to-end industry encryption. No tracking pixels, no telemetry or seed oil logs!
                </p>
              )}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-black hover:bg-[#8d5438] text-white uppercase text-xs tracking-widest font-black transition-colors rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              UNDERSTOOD!
            </button>
          </div>
        </div>
      )}

    </footer>
  );
}
