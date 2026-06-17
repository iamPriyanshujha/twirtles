import React, { useState } from 'react';
import { User, Mail, MapPin, Package, Clock, ShieldCheck, LogOut, ExternalLink, RefreshCw, Save, Phone, Edit, ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DeliveryTimeline from './DeliveryTimeline';

interface AccountPageProps {
  setView: (view: 'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about' | 'admin') => void;
}

export default function AccountPage({ setView }: AccountPageProps) {
  const { user, profile, orders, isLoading, signIn, signOut, updateProfile, sessionRole, fetchOrders, setIsAuthModalOpen } = useAuth();
  
  // Local login/registration role selection state
  const [loginRole, setLoginRole] = useState<'customer' | 'admin'>('customer');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Helper for 2-Way / 3-Way COD Delivery Verification updates
  const handleUpdateVerification = async (orderId: string, fields: any) => {
    try {
      const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const orderRef = doc(db, 'orders', orderId);
      
      // If we are updating courier or customer flags, merge them. 
      // Admin clicks the ultimate reconcile button inside the Admin Dashboard.
      await updateDoc(orderRef, {
        ...fields,
        updatedAt: serverTimestamp()
      });
      await fetchOrders();
    } catch (err: any) {
      alert(`Database rejected verification update: ${err.message}`);
    }
  };

  // Local edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editPin, setEditPin] = useState('');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSignoutLoading, setIsSignoutLoading] = useState(false);

  // Trigger editing form load
  const startEditing = () => {
    if (profile) {
      setEditName(profile.displayName || user?.displayName || '');
      setEditPhone(profile.phone || '');
      setEditAddress(profile.deliveryAddress || '');
      setEditCity(profile.city || '');
      setEditState(profile.state || '');
      setEditPin(profile.pinCode || '');
      setIsEditing(true);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        displayName: editName,
        phone: editPhone,
        deliveryAddress: editAddress,
        city: editCity,
        state: editState,
        pinCode: editPin,
      });
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOutClick = async () => {
    setIsSignoutLoading(true);
    try {
      await signOut();
      setView('home');
    } catch (err) {
      console.error("Signout failed:", err);
    } finally {
      setIsSignoutLoading(false);
    }
  };

  // 1. Loading state view
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-4 text-center bg-[#FAF7F2] flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-chomps-red border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-sans font-black text-xs uppercase tracking-widest text-[#351D14]">
          Loading profile details...
        </p>
      </div>
    );
  }

  // 2. Logged out state view (Unified beautiful card triggering AuthModal)
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border-4 border-chomps-black shadow-[8px_8px_0px_0px_rgba(255,242,0,1)] text-center font-sans p-8">
        <div className="w-16 h-16 bg-[#FFF3F2] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#E12B2E] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <User className="w-8 h-8 text-chomps-red" />
        </div>
        
        <h2 className="font-display font-black text-2xl text-chomps-black uppercase tracking-wider mb-2 leading-none">
          Snacker Workspace
        </h2>
        <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wider px-2 mb-6 leading-relaxed">
          Create, monitor, and track deliveries or configure custom snack collections and pricing
        </p>

        <div className="space-y-4">
          <button
            id="account-google-login-cta"
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-[#E12B2E] text-white py-3 px-6 border-2 border-chomps-black hover:bg-chomps-yellow hover:text-black font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <LogIn className="w-4 h-4 shrink-0" />
            Sign In / Register Account
          </button>

          <button
            id="account-google-back-home"
            onClick={() => setView('home')}
            className="w-full bg-white text-chomps-black py-2.5 px-6 border-2 border-chomps-black hover:bg-zinc-50 font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(225,43,46,0.1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            ← Back to Shop
          </button>
        </div>

        <p className="mt-8 text-[8px] text-gray-400 font-bold uppercase">
          🔒 Enforced with strict role controls and database route guard rails.
        </p>
      </div>
    );
  }

  // Helper values
  const photoUrl = user.photoURL;
  const initial = (profile?.displayName || user.displayName || 'S').charAt(0).toUpperCase();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 bg-[#FAF7F2]">
      
      {/* Header navigation bar */}
      <div className="border-b-4 border-chomps-black pb-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button 
            id="account-back-home"
            onClick={() => setView('home')} 
            className="text-xs text-chomps-black hover:text-chomps-red flex items-center gap-1.5 uppercase font-sans font-extrabold tracking-wider mb-2"
          >
            ← Continue Snacking
          </button>
          <h1 className="font-display font-normal text-4xl text-chomps-black uppercase tracking-wider">
            Snacker Profile
          </h1>
        </div>
        
        {/* Quick action profile cards */}
        <div className="flex items-center gap-2">
          <button
            id="account-top-shop"
            onClick={() => setView('home')}
            className="px-4 py-2 bg-chomps-yellow text-chomps-black text-xs font-black uppercase tracking-wider border-2 border-chomps-black hover:bg-white transition-colors"
          >
            Buy Snacks!
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Profile card & Address editors */}
        <div className="lg:col-span-5 bg-white border-2 border-chomps-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none">
          <div className="flex flex-col items-center text-center pb-6 border-b-2 border-chomps-black/10">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt="Google User" 
                className="w-18 h-18 rounded-full mb-3 border-2 border-chomps-black ring-4 ring-chomps-yellow/40 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-18 h-18 bg-chomps-red text-white flex items-center justify-center text-2xl font-display font-bold mb-3 border-2 border-chomps-black shadow-md rounded-none">
                {initial}
              </div>
            )}
            
            <h2 className="font-display font-normal text-2xl sm:text-3xl text-chomps-black uppercase tracking-wider leading-none">
              {profile?.displayName || user.displayName || 'Snacker Champion'}
            </h2>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5 justify-center font-mono font-bold">
              <Mail className="w-3.5 h-3.5 text-chomps-red" /> {user.email}
            </p>
          </div>

          {/* If editing profile details */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="py-6 flex flex-col gap-4 border-b-2 border-chomps-black/10 text-xs font-sans">
              <p className="text-chomps-red uppercase font-black text-[10px] tracking-wider mb-2">
                ✏️ Edit Delivery Coordinates
              </p>
              
              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-black text-gray-500 tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter full name"
                  className="bg-white border-2 border-chomps-black px-3 py-2 text-xs font-bold outline-none text-chomps-black"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-black text-gray-500 tracking-wider">Contact Phone</label>
                <input 
                  type="tel" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="bg-white border-2 border-chomps-black px-3 py-2 text-xs font-bold outline-none text-chomps-black"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-black text-gray-500 tracking-wider">Shipping Address</label>
                <textarea 
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  rows={2}
                  placeholder="Flat, street, locality name"
                  className="bg-white border-2 border-chomps-black px-3 py-2 text-xs font-bold outline-none text-chomps-black resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-black text-gray-500 tracking-wider">City</label>
                  <input 
                    type="text" 
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    placeholder="New Delhi"
                    className="bg-white border-2 border-chomps-black px-3 py-2 text-xs font-bold outline-none text-chomps-black"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-black text-gray-500 tracking-wider">State</label>
                  <input 
                    type="text" 
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    placeholder="Delhi"
                    className="bg-white border-2 border-chomps-black px-3 py-2 text-xs font-bold outline-none text-chomps-black"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-black text-gray-500 tracking-wider">PIN Code</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={editPin}
                  onChange={(e) => setEditPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="110001"
                  className="bg-white border-2 border-chomps-black px-3 py-2 text-xs font-bold outline-none text-chomps-black"
                  required
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-chomps-red text-white py-2 px-3 border-2 border-chomps-black hover:bg-white hover:text-chomps-black transition-colors font-black uppercase tracking-wider text-center text-[10px]"
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-chomps-black px-4 py-2 border-2 border-chomps-black font-black uppercase tracking-wider text-[10px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 flex flex-col gap-4 border-b-2 border-chomps-black/10 text-xs sm:text-sm font-sans font-bold">
              <div className="flex justify-between items-center mb-1">
                <p className="text-chomps-red uppercase font-black text-[10px] tracking-wider">
                  🚚 Shipping Coordinates
                </p>
                <button
                  onClick={startEditing}
                  className="text-xs text-chomps-black hover:text-chomps-red flex items-center gap-1 uppercase font-black tracking-wide bg-chomps-yellow/20 px-2 py-1 border border-chomps-black"
                >
                  <Edit className="w-3 h-3" /> Edit Profile
                </button>
              </div>

              <div className="flex items-start gap-2.5 text-chomps-black">
                <Phone className="w-4 h-4 text-chomps-red mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-400 block uppercase tracking-wider text-[9px] font-black">Phone Number</span>
                  <span>{profile?.phone || <em className="text-gray-400">Not provided</em>}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-chomps-black">
                <MapPin className="w-4 h-4 text-chomps-red mt-0.5 flex-shrink-0" />
                <div className="w-full">
                  <span className="text-gray-400 block uppercase tracking-wider text-[9px] font-black">Default Address</span>
                  {profile?.deliveryAddress ? (
                    <span className="block italic text-gray-700 leading-normal">
                      {profile.deliveryAddress}
                      {(profile.city || profile.state || profile.pinCode) && (
                        <span className="block mt-1 uppercase font-black text-[10px] bg-[#FFF3F2] py-1 px-2 border border-[#F7CDD0] text-[#351D14] inline-block font-sans rounded-none">
                          📍 {profile.city}, {profile.state} - {profile.pinCode}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-gray-400 block italic">Address not saved yet. Please click edit above!</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-chomps-black font-sans font-black uppercase tracking-widest text-[9px] bg-chomps-yellow px-2.5 py-1 border-2 border-chomps-black rounded-none">
                  PRO SNACKER (LIVE FEED)
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-3 font-black font-sans uppercase">
            {/* Admin Dashboard Entry Card for owners / graders */}
            {(user?.email && ['priyanshujha1402@gmail.com', 'priyanshujha2610@gmail.com'].includes(user.email) || profile?.role === 'admin') && sessionRole === 'admin' && (
              <div className="p-4 bg-red-50 border-2 border-chomps-red text-chomps-black flex flex-col gap-2 rounded-none normal-case">
                <h3 className="font-sans font-black uppercase text-xs text-chomps-red flex items-center gap-2">
                  🛡️ Owner / Admin Portal
                </h3>
                <p className="text-[10px] text-gray-600 font-bold leading-normal uppercase">
                  View all customer orders, change statuses (processing, shipped, completed, declined), and review registered profiles in real-time.
                </p>
                <button
                  id="acct-go-admin"
                  type="button"
                  onClick={() => setView('admin')}
                  className="w-full bg-chomps-red text-white hover:bg-white hover:text-chomps-black py-2.5 px-4 border-2 border-chomps-black text-center font-sans font-black uppercase tracking-wider text-[10px] transition-colors shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Open Owner Dashboard →
                </button>
              </div>
            )}

            <button
              id="acct-logout"
              disabled={isSignoutLoading}
              onClick={handleSignOutClick}
              className="w-full text-left flex items-center justify-between border-2 border-dashed border-[#EF4444]/40 hover:border-[#EF4444] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#EF4444] hover:bg-red-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Log out of Google Account
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {saveSuccess && (
            <div className="mt-4 p-3.5 bg-emerald-50 border-2 border-emerald-500 text-emerald-800 text-[10px] font-sans font-black uppercase tracking-wider leading-relaxed">
              🎉 Shipping coordinates updated successfully!
            </div>
          )}
        </div>

        {/* Right column: Historic Orders list */}
        <div className="lg:col-span-7 bg-white border-2 border-chomps-black p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none">
          <h2 className="font-display font-normal text-3xl text-chomps-black uppercase tracking-wider mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package className="w-6 h-6 text-chomps-red" /> Purchase Log
            </span>
            <span className="text-xs bg-chomps-red text-white py-1 px-3 border border-chomps-black uppercase tracking-widest font-sans font-extrabold rounded-none">
              {orders.length} Orders
            </span>
          </h2>

          {orders.length === 0 ? (
            <div className="border-4 border-dashed border-gray-200 py-12 px-4 text-center font-sans">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                No orders in the database logger yet!
              </p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-semibold">
                Proceed to checkout to purchase with Cash on Delivery or Razorpay secure portal!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 max-h-[70vh] overflow-y-auto pr-1">
              {orders.map((order) => {
                const isPaid = order.paymentStatus === 'success' || order.paymentStatus === 'Paid';
                return (
                  <div 
                    id={`user-order-card-${order.orderId}`}
                    key={order.orderId} 
                    className="border-2 border-chomps-black p-4 bg-chomps-cream/10 hover:bg-chomps-cream/30 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-sans text-chomps-black"
                  >
                    {/* Order header row */}
                    <div className="flex justify-between items-center border-b border-chomps-black/10 pb-3 mb-3 flex-wrap gap-2 text-xs">
                      <div>
                        <span className="text-gray-400 uppercase font-sans font-black text-[9px] tracking-wider block">ID TRANSACTION</span>
                        <strong className="text-chomps-red text-base font-black tracking-tight">{order.orderId}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 uppercase font-sans font-black text-[9px] tracking-wider block">Payment Method</span>
                        <span className="font-mono text-[10px] font-black uppercase bg-[#FFF200] px-2 py-0.5 border border-black rounded-none">
                          {order.paymentMethod === 'razorpay' ? '💳 RAZORPAY SECURE' : '💵 CASH ON DELIVERY'}
                        </span>
                      </div>
                    </div>

                    {/* Order Details items */}
                    <div className="flex justify-between items-start gap-4 flex-wrap text-xs font-bold my-1">
                      <div className="flex-1">
                        <span className="text-gray-400 uppercase font-sans font-black text-[9px] tracking-wider block mb-1">Snacks Purchased</span>
                        <div className="flex flex-col gap-1 text-[11px] text-gray-700 font-bold">
                          {order.items.map((item: any, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span>• {item.product.name} (x{item.quantity})</span>
                              <span className="text-gray-400 font-mono">₹ {(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 uppercase font-sans font-black text-[9px] tracking-wider block mb-1">Paid Total</span>
                        <span className="font-mono text-base font-black text-chomps-red">₹ {order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Shipping info */}
                    <div className="mt-3.5 bg-[#FAF7F2] p-2 px-3 border border-chomps-black/15 text-[11px] font-bold text-gray-600">
                      <span className="text-gray-400 uppercase tracking-wider text-[8px] block font-black mb-0.5">SHIP TO</span>
                      <p className="font-sans text-gray-800 font-semibold">{order.recipientName} ({order.phone})</p>
                      <p className="text-gray-500 text-[10px] truncate">{order.shippingAddress}, {order.city}, {order.state} - {order.pinCode}</p>
                    </div>

                    {/* Payment reference info */}
                    {order.paymentId && (
                      <p className="mt-2 text-[9px] text-emerald-600 font-mono font-bold uppercase tracking-wider">
                        ⚡ Razorpay Reference ID: {order.paymentId}
                      </p>
                    )}

                    {/* Live delivery bike progress tracker */}
                    <div className="mt-4">
                      <DeliveryTimeline 
                        orderStatus={order.orderStatus} 
                        pinCode={order.pinCode} 
                        city={order.city} 
                      />
                    </div>

                    {/* TWO-WAY / THREE-WAY COD VERIFICATION CHECKLIST */}
                    {order.paymentMethod === 'cod' && (
                      <div className="mt-4 p-3 bg-zinc-50 border-2 border-chomps-black flex flex-col gap-3 rounded-none text-xs">
                        <h4 className="font-sans font-black uppercase text-[10px] text-chomps-red tracking-wider flex items-center gap-1.5 border-b border-black/10 pb-1.5">
                          💵 3-Way COD Delivery Verification Checklist
                        </h4>
                        
                        <div className="flex flex-col gap-2 font-mono text-[10.5px]">
                          {/* Step 1: Courier Driver Cash Collection */}
                          <div className="flex items-center justify-between gap-4">
                            <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span>{order.courierCollected ? '✅' : '⏳'}</span> 
                              <span className="font-sans font-extrabold text-[#351D14]">1. Courier Driver Handover & Cash Collected</span>
                            </span>
                            {!order.courierCollected ? (
                              <button
                                type="button"
                                onClick={() => handleUpdateVerification(order.orderId, { courierCollected: true })}
                                className="bg-chomps-yellow text-chomps-black hover:bg-black hover:text-white px-2 py-1 border border-chomps-black font-sans font-black uppercase text-[9px] transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 whitespace-nowrap"
                              >
                                🚴 Driver: Cash Collected
                              </button>
                            ) : (
                              <span className="text-emerald-700 font-sans font-black uppercase text-[9px] bg-emerald-50 px-2 py-0.5 border border-emerald-200 whitespace-nowrap">
                                COMPLETED ✓
                              </span>
                            )}
                          </div>

                          {/* Step 2: Customer Acknowledgment */}
                          <div className="flex items-center justify-between gap-4">
                            <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span>{order.customerAcknowledged ? '✅' : '⏳'}</span> 
                              <span className="font-sans font-extrabold text-[#351D14]">2. Customer Delivery Acknowledgment</span>
                            </span>
                            {!order.customerAcknowledged ? (
                              <button
                                type="button"
                                disabled={!order.courierCollected}
                                onClick={() => handleUpdateVerification(order.orderId, { customerAcknowledged: true })}
                                className={`px-2 py-1 border border-chomps-black font-sans font-black uppercase text-[9px] transition-all rounded-none whitespace-nowrap ${
                                  order.courierCollected 
                                    ? 'bg-[#E12B2E] text-white hover:bg-white hover:text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                                }`}
                                title={!order.courierCollected ? "Awaiting courier driver collection confirmation" : ""}
                              >
                                🤝 Acknowledge Receipt
                              </button>
                            ) : (
                              <span className="text-emerald-700 font-sans font-black uppercase text-[9px] bg-emerald-50 px-2 py-0.5 border border-emerald-200 whitespace-nowrap">
                                COMPLETED ✓
                              </span>
                            )}
                          </div>

                          {/* Step 3: Admin Final Mark Paid & Delivered */}
                          <div className="flex items-center justify-between gap-4">
                            <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span>{order.adminConfirmed ? '✅' : '⏳'}</span> 
                              <span className="font-sans font-extrabold text-[#351D14]">3. Live Admin Dashboard Ledger reconciled</span>
                            </span>
                            <span className={`font-sans font-black uppercase text-[9px] px-2 py-0.5 border whitespace-nowrap ${
                              order.adminConfirmed 
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                                : 'text-amber-700 bg-amber-50 border-amber-200 animate-pulse'
                            }`}>
                              {order.adminConfirmed ? 'COMPLETED ✓' : 'Awaiting Live Reconcile'}
                            </span>
                          </div>
                        </div>

                        {/* Informative Help Message */}
                        {!order.adminConfirmed && (
                          <div className="bg-amber-50 p-2 border border-amber-200 text-[10px] text-amber-900 leading-normal font-sans font-medium">
                            💡 {(!order.courierCollected && !order.customerAcknowledged) && "To complete Cash on Delivery verification, click 'Driver: Cash Collected' (simulating Courier Driver) then click 'Acknowledge Receipt' (as Customer). Finally, the Admin will reconcile live inside the Admin Dashboard!"}
                            {(order.courierCollected && !order.customerAcknowledged) && "Courier driver delivered snacks! Customer: Please click 'Acknowledge Receipt' above."}
                            {(order.courierCollected && order.customerAcknowledged) && "Both Courier and Customer verified! Waiting for Owner/Admin to press 'Mark as Paid & Delivered' inside the Admin Dashboard."}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom Status bar */}
                    <div className="pt-3.5 mt-3 border-t border-dashed border-chomps-black/10 flex justify-between items-center text-xs flex-wrap gap-2 font-bold">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full inline-block animate-pulse ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-chomps-black font-sans font-black uppercase tracking-widest text-[9px] bg-chomps-yellow px-2 py-0.5 border border-chomps-black">
                          {order.orderStatus}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-sans uppercase">Checkout status:</span>
                        <strong className={`uppercase text-[10px] font-black ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {isPaid 
                            ? '✓ PAID & DELIVERED' 
                            : order.paymentMethod === 'cod' 
                              ? '⚠ PENDING CASH ON DELIVERY' 
                              : '⚠ PENDING PAYMENT'}
                        </strong>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {isSignoutLoading && (
        <div className="fixed inset-0 bg-[#FAF7F2]/90 z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-chomps-red border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="font-display font-black text-2xl text-chomps-black uppercase tracking-wider mb-2">
            Signing you out...
          </h2>
          <p className="font-sans font-bold text-xs uppercase tracking-wider text-gray-400">
            Have a wonderfully crunch-filled snacky day!
          </p>
        </div>
      )}

    </div>
  );
}
