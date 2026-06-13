import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import { generateProducts } from './data/mockData';
import { Product, CartItem, User } from './types';

const App: React.FC = () => {
  const [products] = useState<Product[]>(() => generateProducts(48));
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Cart logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Auth Handlers
  const handleLoginSuccess = (name: string, email: string) => {
    setUser({ name, email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <CategoryBar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {activeCategory === 'All' && !searchQuery && (
          <div className="mb-6 rounded-sm overflow-hidden shadow-sm h-48 md:h-64 bg-blue-600 relative">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover opacity-80"
              alt="Sale Banner"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">Big Billion Days</h2>
              <p className="text-lg md:text-xl opacity-90">Up to 80% Off on Top Brands</p>
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {searchQuery ? `Search results for "${searchQuery}"` : `${activeCategory} Collection`}
            <span className="ml-2 text-sm font-normal text-gray-500">({filteredProducts.length} items)</span>
          </h2>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-sm text-center">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="mt-4 text-[#2874f0] font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <footer className="bg-[#172337] text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-gray-400 text-xs font-bold mb-4 uppercase">About</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 text-xs font-bold mb-4 uppercase">Help</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 text-xs font-bold mb-4 uppercase">Policy</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>Return Policy</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 text-xs font-bold mb-4 uppercase">Social</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
          © 2025 Flipkart Clone. Built for demonstration.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
