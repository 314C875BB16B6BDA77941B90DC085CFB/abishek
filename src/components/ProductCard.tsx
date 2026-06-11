import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-sm hover:shadow-xl transition-shadow group flex flex-col h-full border border-transparent hover:border-gray-100"
    >
      <div className="relative aspect-[3/4] mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2 h-8">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-bold">
            {product.rating} <Star size={10} fill="currentColor" />
          </span>
          <span className="text-gray-400 text-xs font-semibold">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-400 line-through text-xs">₹{product.oldPrice.toLocaleString()}</span>
          <span className="text-green-600 text-xs font-bold">{discount}% off</span>
        </div>
      </div>

      <button 
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full bg-[#ff9f00] text-white py-2 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-[#f39700] transition-colors"
      >
        <ShoppingCart size={16} />
        ADD TO CART
      </button>
    </motion.div>
  );
};

export default ProductCard;
