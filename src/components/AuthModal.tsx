import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const handleGoogleLogin = () => {
    // Simulating Google OAuth redirect/success
    setTimeout(() => {
      onLoginSuccess('John Doe', 'john.doe@gmail.com');
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[520px] bg-white z-[101] rounded-sm overflow-hidden flex shadow-2xl"
          >
            {/* Left Sidebar - Flipkart Style */}
            <div className="hidden md:flex w-2/5 bg-[#2874f0] p-10 flex-col justify-between text-white">
              <div>
                <h2 className="text-3xl font-bold mb-4">Login</h2>
                <p className="text-lg opacity-80 leading-relaxed">
                  Get access to your Orders, Wishlist and Recommendations
                </p>
              </div>
              <img 
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
                alt="login illustration" 
                className="w-full object-contain"
              />
            </div>

            {/* Right Content - Form */}
            <div className="flex-1 p-10 relative flex flex-col">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter Email/Mobile number"
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#2874f0] transition-colors text-sm"
                    />
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to Flipkart's <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
                  </p>

                  <button className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-bold shadow-md hover:bg-[#f4511e] transition-colors">
                    CONTINUE
                  </button>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Google Login Button */}
                  <button 
                    onClick={handleGoogleLogin}
                    className="w-full border border-gray-300 py-3 rounded-sm font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>

              <div className="mt-auto text-center">
                <button className="text-[#2874f0] text-sm font-bold hover:underline">
                  New to Flipkart? Create an account
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
