import React from 'react';
import { Search, ShoppingCart, User, ChevronDown, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden">
            <Menu size={24} />
          </button>
          <div className="flex flex-col leading-none">
            <span className="italic font-bold text-xl">Flipkart</span>
            <span className="italic text-[10px] flex items-center gap-0.5 text-yellow-400 font-semibold">
              Explore <span className="text-white">Plus</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full py-2 px-4 pr-10 rounded-sm text-black focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2 text-[#2874f0]" size={20} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8 font-semibold text-sm">
          <button className="bg-white text-[#2874f0] px-8 py-1 rounded-sm hidden lg:block">
            Login
          </button>
          <div className="hidden lg:flex items-center gap-1 cursor-pointer">
            Become a Seller
          </div>
          <div className="hidden lg:flex items-center gap-1 cursor-pointer">
            More <ChevronDown size={16} />
          </div>
          <button 
            onClick={onCartClick}
            className="flex items-center gap-2 relative group"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full py-2 px-4 pr-10 rounded-sm text-black focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2 text-gray-400" size={18} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
