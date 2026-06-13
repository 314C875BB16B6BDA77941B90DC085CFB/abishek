import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Menu, User as UserIcon, LogOut, Package, Heart } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  searchQuery, 
  setSearchQuery, 
  user, 
  onLoginClick,
  onLogout 
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden">
            <Menu size={24} />
          </button>
          <div className="flex flex-col leading-none cursor-pointer">
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
          {user ? (
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsProfileOpen(true)}
                className="flex items-center gap-1 hover:text-gray-200 py-4"
              >
                {user.name.split(' ')[0]} <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Profile Dropdown */}
              <div 
                onMouseLeave={() => setIsProfileOpen(false)}
                className={`absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white text-gray-800 shadow-xl rounded-sm py-2 border border-gray-100 transition-all duration-200 ${isProfileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2874f0] rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{user.name}</span>
                    <span className="text-[10px] text-gray-500">{user.email}</span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-sm">
                  <UserIcon size={18} className="text-[#2874f0]" /> My Profile
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-sm">
                  <Package size={18} className="text-[#2874f0]" /> Orders
                </button>
                <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-sm">
                  <Heart size={18} className="text-[#2874f0]" /> Wishlist
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-sm border-t border-gray-100 text-red-500"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-white text-[#2874f0] px-8 py-1 rounded-sm hidden lg:block hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
          )}

          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-gray-200">
            Become a Seller
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
