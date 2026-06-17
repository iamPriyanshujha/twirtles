import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, Tag, Check, Ticket, X } from 'lucide-react';
import { CartItem } from '../types';
import ChipPacket from './ChipPacket';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, val: number) => void;
  setView: (view: 'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about' | 'admin') => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponDiscount: number; // e.g. 0.1 for 10%
  setCouponDiscount: (discount: number) => void;
}

export default function CartPage({
  cart,
  removeFromCart,
  updateCartQty,
  setView,
  couponCode,
  setCouponCode,
  couponDiscount,
  setCouponDiscount,
}: CartPageProps) {
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMsg, setCouponMsg] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });
  const [isUpdated, setIsUpdated] = useState(false);

  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const discountAmount = subtotal * couponDiscount;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    if (couponInput.toUpperCase() === 'FREE10') {
      setCouponDiscount(0.1);
      setCouponCode('FREE10');
      setCouponMsg({ text: 'Coupon FREE10 applied successfully! You got 10% discount.', type: 'success' });
    } else if (couponInput.toUpperCase() === 'PROTEIN50') {
      setCouponDiscount(0.15);
      setCouponCode('PROTEIN50');
      setCouponMsg({ text: 'Special wellness coupon PROTEIN50 applied! You saved 15%.', type: 'success' });
    } else {
      setCouponMsg({ text: 'Invalid coupon code! Please try "FREE10" or "PROTEIN50".', type: 'error' });
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setCouponCode('');
    setCouponInput('');
    setCouponMsg({ text: 'Coupon code removed.', type: 'success' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="bg-white border-4 border-chomps-black p-10 max-w-lg mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
          <ShoppingBag className="w-16 h-16 mx-auto text-chomps-red mb-4" />
          <h2 className="font-display font-medium text-4xl text-chomps-black uppercase tracking-wider">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 text-xs mt-3.5 leading-relaxed font-sans font-bold">
            Before proceeding to checkout, you must add some yummy, nutritious, protein-rich Twirtles snacks to your shopping bag!
          </p>
          <button
            id="empty-cart-back-home"
            onClick={() => setView('home')}
            className="mt-8 bg-chomps-red hover:bg-chomps-black text-white px-8 py-4 text-sm font-display font-bold uppercase tracking-widest border-2 border-chomps-black shadow-md rounded-none transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 bg-[#FAF7F2]">
      
      {/* Title */}
      <div className="border-b-4 border-chomps-black pb-4 mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <button 
            id="cart-back-home-link"
            onClick={() => setView('home')} 
            className="text-xs text-chomps-black hover:text-chomps-red flex items-center gap-1.5 uppercase font-sans font-extrabold tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-chomps-red" /> Continue Snacking
          </button>
          <h1 className="font-display font-normal text-4xl sm:text-5xl text-chomps-black uppercase tracking-wider">
            Shopping Cart ({cart.length} items)
          </h1>
        </div>

        {/* Small motivational quote */}
        <div className="hidden sm:block text-right">
          <span className="text-[10px] font-sans bg-chomps-yellow text-chomps-black border-2 border-chomps-black px-3.5 py-1.5 uppercase font-black tracking-widest flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-chomps-red" /> Highly Fortified Nutrition Checked
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Product Table */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Table Container */}
          <div className="overflow-x-auto bg-white border-2 border-chomps-black shadow-md">
            <table className="w-full text-left border-collapse min-w-[600px] text-xs sm:text-sm">
              
              {/* Header row */}
              <thead>
                <tr className="border-b-2 border-chomps-black bg-chomps-cream font-display font-bold text-chomps-black uppercase tracking-wider text-base select-none">
                  <th className="py-4 px-5">Product</th>
                  <th className="py-4 px-4 text-center">Price</th>
                  <th className="py-4 px-4 text-center">Quantity</th>
                  <th className="py-4 px-4 text-right">Subtotal</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y-2 divide-gray-100 font-sans font-bold text-chomps-black text-xs sm:text-sm">
                {cart.map((item) => (
                  <tr key={item.product.id} className="hover:bg-chomps-cream/10">
                    
                    {/* Column 1: Image & Title */}
                    <td className="py-4 px-5 flex items-center gap-3.5 min-w-[240px]">
                      <div className="w-14 h-14 bg-white p-1 border-2 border-chomps-black flex-shrink-0 flex items-center justify-center shadow-xs">
                        <ChipPacket type={item.product.image} animate={false} className="w-full h-full" />
                      </div>
                      <div>
                        <h3 className="font-display font-normal text-chomps-black uppercase tracking-wider text-xl leading-none">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-bold font-mono mt-0.5">{item.product.category}</p>
                      </div>
                    </td>

                    {/* Column 2: Price */}
                    <td className="py-4 px-4 text-center font-mono font-black text-chomps-black">
                      ₹ {item.product.price.toFixed(2)}
                    </td>

                    {/* Column 3: Quantity with inputs */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-2 border-2 border-chomps-black p-1 bg-white">
                        <button
                          id={`cart-qty-dec-${item.product.id}`}
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-chomps-yellow text-chomps-black transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-black text-chomps-black">
                          {item.quantity}
                        </span>
                        <button
                          id={`cart-qty-inc-${item.product.id}`}
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-chomps-yellow text-chomps-black transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Column 4: Subtotal */}
                    <td className="py-4 px-4 text-right font-mono font-black text-chomps-red">
                      ₹ {(item.product.price * item.quantity).toFixed(2)}
                    </td>

                    {/* Column 5: Action */}
                    <td className="py-4 px-4 text-center">
                      <button
                        id={`cart-delete-${item.product.id}`}
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 border-2 border-chomps-black bg-white hover:bg-chomps-red hover:text-white text-chomps-red transition-all rounded-none shadow-xs"
                        title="Delete product"
                      >
                        <X className="w-4 h-4 font-black" strokeWidth={3} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Update Cart Actions underneath table */}
          <div className="flex justify-between items-center flex-wrap gap-4 select-none">
            <button
              id="goto-shop-btn"
              onClick={() => setView('home')}
              className="px-5 py-3 border-2 border-chomps-black bg-white hover:bg-chomps-yellow text-chomps-black text-xs font-sans font-black uppercase tracking-wider transition-all rounded-none"
            >
              ← Keep Snacking
            </button>
            <button
              id="update-cart-btn"
              onClick={() => {
                setIsUpdated(true);
                setTimeout(() => setIsUpdated(false), 1500);
              }}
              disabled={isUpdated}
              className={`px-6 py-3 border-2 border-chomps-black text-xs font-sans font-black uppercase tracking-wider transition-all rounded-none ${
                isUpdated 
                  ? 'bg-emerald-600 border-emerald-700 text-white cursor-default' 
                  : 'bg-chomps-black hover:bg-chomps-red text-white'
              }`}
            >
              {isUpdated ? '✓ bag updated!' : 'Update Cart'}
            </button>
          </div>

          {/* Promo Coupon Card */}
          <div className="bg-white border-2 border-chomps-black p-6 shadow-sm select-none rounded-none">
            <h3 className="font-display font-medium text-lg text-chomps-black uppercase tracking-wider flex items-center gap-2 mb-4">
              <Ticket className="w-5 h-5 text-chomps-red rotate-45" /> Coupon Discount:
            </h3>
            
            <form onSubmit={handleApplyCoupon} className="flex gap-2.5 max-w-md">
              <input
                id="cart-coupon-input"
                type="text"
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                disabled={!!couponDiscount}
                className="flex-1 bg-white border-2 border-chomps-black px-3.5 py-2.5 text-xs font-mono font-bold uppercase tracking-wide focus:outline-none focus:border-chomps-red text-gray-800 disabled:bg-gray-100 rounded-none shadow-inner"
              />
              {couponDiscount ? (
                <button
                  id="remove-coupon-btn"
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="bg-chomps-red hover:bg-chomps-black text-white hover:border-chomps-black border-2 border-chomps-black font-display font-bold text-sm uppercase px-5 py-2.5 rounded-none"
                >
                  Remove
                </button>
              ) : (
                <button
                  id="apply-coupon-btn"
                  type="submit"
                  className="bg-chomps-black hover:bg-chomps-red text-white border-2 border-chomps-black font-display font-bold text-sm uppercase px-5 py-2.5 tracking-wider transition-all rounded-none"
                >
                  Apply Coupon
                </button>
              )}
            </form>

            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-3.5">
              💡 Hint: Try coupon <strong className="text-chomps-red">FREE10</strong> to get 10% off, or <strong className="text-chomps-red">PROTEIN50</strong> for 15% off!
            </p>

            {/* Verification message */}
            {couponMsg.text && (
              <div className={`mt-3 p-3 text-xs leading-relaxed font-sans font-bold ${
                couponMsg.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500' 
                  : 'bg-red-50 text-red-800 border-2 border-red-500'
              }`}>
                {couponMsg.text}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Cart Totals card */}
        <div className="lg:col-span-4 bg-white border-2 border-chomps-black p-6 shadow-[4px_4px_0px_0px_rgba(255,242,0,1)] flex flex-col justify-between rounded-none">
          <div>
            <h3 className="font-display font-normal text-2xl text-chomps-black uppercase tracking-wider border-b-2 border-chomps-black/10 pb-3 mb-5">
              Cart Totals
            </h3>

            {/* Calculations lines */}
            <div className="flex flex-col gap-4 font-sans font-black text-xs sm:text-sm text-chomps-black pb-4 border-b-2 border-chomps-black/10">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Subtotal</span>
                <span className="font-mono font-black text-gray-950">₹ {subtotal.toFixed(2)}</span>
              </div>

              {/* Coupon Discount (if applied) */}
              {couponDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-700">
                  <span className="flex items-center gap-1 uppercase tracking-wider text-[11px] font-sans">
                    <Tag className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Code ({couponCode})
                  </span>
                  <span className="font-mono font-black">- ₹ {discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Delivery info */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Shipping</span>
                <span className="text-chomps-black text-[10px] font-sans font-black uppercase tracking-wider bg-chomps-yellow px-2.5 py-1 border-2 border-chomps-black rounded-none">
                  FREE DELIVERY
                </span>
              </div>
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-center text-chomps-red font-black pt-4 mb-8">
              <span className="font-display text-lg uppercase tracking-wider text-chomps-black">Total</span>
              <span className="font-mono text-2xl sm:text-3xl">
                ₹ {total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            id="proceed-checkout-btn"
            onClick={() => setView('checkout')}
            className="w-full bg-chomps-red hover:bg-chomps-black text-white font-display font-bold text-xl uppercase py-4.5 tracking-widest text-center shadow-lg transition-all duration-200 border-b-4 border-chomps-black hover:border-b-4 active:border-b-0 rounded-none transform hover:-translate-y-0.5"
          >
            Proceed to Checkout
          </button>

          <p className="text-[10px] text-gray-400 text-center font-mono font-bold uppercase tracking-widest mt-4">
            🔒 Safe & Secure 256-Bit SSL Encrypted Checkout.
          </p>
        </div>

      </div>

    </div>
  );
}
