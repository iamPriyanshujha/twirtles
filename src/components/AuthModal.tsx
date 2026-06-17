import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus, Shield, User, Check, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, signIn } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin'>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleAuthAction = async () => {
    setIsSubmitting(true);
    setErrorText(null);
    try {
      const isRegistering = authMode === 'register';
      await signIn(selectedRole, isRegistering);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error("Auth action failed:", err);
      setErrorText(err?.message || "An authentication error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        {/* Backdrop for close trigger */}
        <div 
          className="absolute inset-0 cursor-pointer" 
          onClick={() => {
            if (!isSubmitting) setIsAuthModalOpen(false);
          }} 
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-md bg-[#FAF7F2] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-[#351D14] z-10 font-sans"
        >
          {/* Close button */}
          <button
            id="auth-modal-close-btn"
            disabled={isSubmitting}
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute -top-3 -right-3 w-10 h-10 bg-[#E12B2E] border-2 border-black text-white hover:bg-[#FAF7F2] hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center rounded-none z-20 cursor-pointer"
            title="Close authentication overlay"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Dual Mode Switcher Tabs */}
          <div className="flex border-2 border-black bg-white mb-6 p-1">
            <button
              id="auth-modal-tab-login"
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorText(null);
              }}
              className={`flex-1 py-2 text-center text-xs font-sans font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'login'
                  ? 'bg-black text-white'
                  : 'text-gray-400 hover:text-black hover:bg-zinc-100'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              id="auth-modal-tab-register"
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorText(null);
              }}
              className={`flex-1 py-2 text-center text-xs font-sans font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'register'
                  ? 'bg-black text-white'
                  : 'text-gray-400 hover:text-black hover:bg-zinc-100'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Register
            </button>
          </div>

          <div className="text-center mb-6">
            <h3 className="font-display font-black text-2xl uppercase tracking-wider text-black leading-none mb-1">
              {authMode === 'login' ? 'Lock & Key Portal' : 'Register Snacker'}
            </h3>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              {authMode === 'login' 
                ? 'Sign in to access your transaction records and active wishlist' 
                : 'Create a brand new snacking ID to unlock interactive features'}
            </p>
          </div>

          {/* Strict Role Selection - Clear Radio Toggles */}
          <div className="mb-6">
            <span className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-wider">
              Choose your account role:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup">
              {/* Radio Option 1: Customer */}
              <label
                className={`border-2 border-black p-3 flex flex-col justify-between cursor-pointer transition-all ${
                  selectedRole === 'customer'
                    ? 'bg-chomps-yellow shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${selectedRole === 'customer' ? 'text-black' : 'text-gray-400'}`} />
                    <span className="font-sans font-black text-xs uppercase tracking-wide">Customer</span>
                  </div>
                  <input
                    type="radio"
                    name="auth-role"
                    value="customer"
                    checked={selectedRole === 'customer'}
                    onChange={() => setSelectedRole('customer')}
                    className="sr-only" /* hidden for custom styling */
                  />
                  <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center bg-white">
                    {selectedRole === 'customer' && <div className="w-2 h-2 rounded-full bg-black animate-scale-in" />}
                  </div>
                </div>
                <p className="text-[9px] text-[#351D14]/75 uppercase font-bold leading-tight mt-1.5">
                  Shop treats, leave feedback, and follow tracking progress.
                </p>
              </label>

              {/* Radio Option 2: Admin */}
              <label
                className={`border-2 border-black p-3 flex flex-col justify-between cursor-pointer transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-[#E12B2E] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white hover:bg-zinc-50 text-black'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-white' : 'text-gray-400'}`} />
                    <span className="font-sans font-black text-xs uppercase tracking-wide">Admin</span>
                  </div>
                  <input
                    type="radio"
                    name="auth-role"
                    value="admin"
                    checked={selectedRole === 'admin'}
                    onChange={() => setSelectedRole('admin')}
                    className="sr-only"
                  />
                  <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center bg-white">
                    {selectedRole === 'admin' && <div className="w-2 h-2 rounded-full bg-[#E12B2E] animate-scale-in" />}
                  </div>
                </div>
                <p className={`text-[9px] uppercase font-bold leading-tight mt-1.5 ${
                  selectedRole === 'admin' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  Control pricing CMS, confirm updates, review gross income counters.
                </p>
              </label>
            </div>
          </div>

          {/* Secure login explanation based on role selection */}
          <div className="mb-6 p-3 bg-zinc-50 border border-dashed border-zinc-300 text-[10px] font-bold leading-relaxed text-zinc-600">
            {authMode === 'register' ? (
              selectedRole === 'admin' ? (
                <p className="normal-case">
                  🔐 Registering as an <strong className="text-chomps-red">Administrator</strong> will request the core permissions needed to modify products, edit delivery parameters, and review active logs. Your email will be logged and subject to admin verification.
                </p>
              ) : (
                <p className="normal-case">
                  🛍️ Registering as a <strong className="text-black">Customer</strong> will set up your private dashboard for checking shipments, adding reviews, and following progress tracking. No special access required.
                </p>
              )
            ) : (
              selectedRole === 'admin' ? (
                <p className="normal-case">
                  🔑 Logging in as <strong className="text-chomps-red">Admin</strong>. Authentic administrative authorization is verified from the Firestore database profile. Non-admins will automatically route to Customer views.
                </p>
              ) : (
                <p className="normal-case">
                  🛒 Logging in as <strong className="text-black">Customer</strong>. Loads your active wishlist items and shipping information.
                </p>
              )
            )}
          </div>

          {/* Error notifications */}
          {errorText && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-[#E12B2E] text-red-700 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Core Action Trigger */}
          <button
            id="auth-modal-action-trigger"
            disabled={isSubmitting}
            onClick={handleAuthAction}
            className={`w-full py-3.5 border-4 border-black text-center text-xs font-sans font-black uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer ${
              selectedRole === 'admin'
                ? 'bg-[#E12B2E] text-white hover:bg-[#FAF7F2] hover:text-black'
                : 'bg-chomps-yellow text-[#351D14] hover:bg-black hover:text-white'
            } ${isSubmitting ? 'opacity-70 cursor-not-allowed shadow-none translate-x-0.5 translate-y-0.5' : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className={`w-4 h-4 border-2 rounded-full animate-spin border-t-transparent ${
                  selectedRole === 'admin' ? 'border-white' : 'border-black'
                }`} />
                Securing Credential...
              </>
            ) : (
              <>
                {authMode === 'login' ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In with Google
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Complete Registration
                  </>
                )}
              </>
            )}
          </button>

          {/* Modal Disclaimer */}
          <p className="text-center text-[8px] text-gray-400 font-bold uppercase mt-4">
            🔒 Fully encrypted 256-bit OAuth authentication powered by Google Secure Identity.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
