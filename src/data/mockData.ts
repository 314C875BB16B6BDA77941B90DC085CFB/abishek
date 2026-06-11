import { faker } from '@faker-js/faker';
import { Product } from '../types';

const categories = ['Shirts', 'Pants', 'Bags', 'Phones', 'Laptops', 'Watches', 'Shoes'];

export const generateProducts = (count: number = 40): Product[] => {
  return Array.from({ length: count }).map(() => {
    const price = parseFloat(faker.commerce.price({ min: 500, max: 80000 }));
    const category = faker.helpers.arrayElement(categories);
    
    // Using high-quality Unsplash images based on category
    const imageMap: Record<string, string> = {
      'Shirts': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
      'Pants': 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
      'Bags': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
      'Phones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      'Laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80',
      'Watches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    };

    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: price,
      oldPrice: price * (1 + Math.random() * 0.5),
      category: category,
      image: imageMap[category] || faker.image.urlLoremFlickr({ category: 'fashion' }),
      rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      reviews: faker.number.int({ min: 10, max: 5000 }),
    };
  });
};

export const CATEGORIES = ['All', ...categories];
