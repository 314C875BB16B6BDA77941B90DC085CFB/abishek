import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-100 z-[70] shadow-2xl flex flex-col"
          >
            <div className="bg-[#2874f0] p-4 text-white flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag size={20} />
                My Cart ({items.length})
              </h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d405a710-21da-4f32-902a-478cf50d9046.png?q=90" alt="empty" className="w-48" />
                  <p className="text-lg font-medium">Your cart is empty!</p>
                  <button onClick={onClose} className="bg-[#2874f0] text-white px-8 py-2 rounded-sm">Shop Now</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-sm shadow-sm flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        <div className="flex items-center border rounded-sm overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-xs text-red-500 font-bold mt-2 hover:underline"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-xl font-bold">₹{total.toLocaleString()}</span>
                </div>
                <button className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-bold text-lg shadow-lg hover:bg-[#f4511e] transition-colors">
                  PLACE ORDER
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
