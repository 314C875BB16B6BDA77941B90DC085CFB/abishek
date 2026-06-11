import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="bg-white shadow-sm border-b overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3 min-w-max md:min-w-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
              ${activeCategory === cat 
                ? 'text-[#2874f0] border-b-2 border-[#2874f0]' 
                : 'text-gray-700 hover:text-[#2874f0]'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
