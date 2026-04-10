"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('bestsellers');
  
  const products = {
    bestsellers: [
      { id: 1, name: "MacBook Pro M3", price: "Rs. 449,999", originalPrice: "Rs. 499,999", image: "/svgs/hero.png", badge: "Best Seller", rating: 4.9 },
      { id: 2, name: "Dell XPS 13", price: "Rs. 299,999", originalPrice: "Rs. 349,999", image: "/svgs/hero.png", badge: "Popular", rating: 4.8 },
      { id: 3, name: "ASUS ROG Strix", price: "Rs. 399,999", originalPrice: "Rs. 449,999", image: "/svgs/hero.png", badge: "Gaming", rating: 4.7 },
      { id: 4, name: "HP Spectre x360", price: "Rs. 279,999", originalPrice: "Rs. 319,999", image: "/svgs/hero.png", badge: "Premium", rating: 4.6 }
    ],
    newArrivals: [
      { id: 5, name: "MacBook Air M3", price: "Rs. 349,999", originalPrice: "Rs. 399,999", image: "/svgs/hero.png", badge: "New", rating: 4.9 },
      { id: 6, name: "Surface Laptop 5", price: "Rs. 259,999", originalPrice: "Rs. 299,999", image: "/svgs/hero.png", badge: "New", rating: 4.7 },
      { id: 7, name: "ThinkPad X1 Carbon", price: "Rs. 389,999", originalPrice: "Rs. 429,999", image: "/svgs/hero.png", badge: "Business", rating: 4.8 },
      { id: 8, name: "Alienware m15", price: "Rs. 499,999", originalPrice: "Rs. 549,999", image: "/svgs/hero.png", badge: "Gaming", rating: 4.6 }
    ],
    deals: [
      { id: 9, name: "Acer Aspire 5", price: "Rs. 149,999", originalPrice: "Rs. 199,999", image: "/svgs/hero.png", badge: "25% OFF", rating: 4.4 },
      { id: 10, name: "Lenovo IdeaPad", price: "Rs. 179,999", originalPrice: "Rs. 229,999", image: "/svgs/hero.png", badge: "22% OFF", rating: 4.3 },
      { id: 11, name: "HP Pavilion", price: "Rs. 199,999", originalPrice: "Rs. 249,999", image: "/svgs/hero.png", badge: "20% OFF", rating: 4.5 },
      { id: 12, name: "ASUS VivoBook", price: "Rs. 169,999", originalPrice: "Rs. 219,999", image: "/svgs/hero.png", badge: "23% OFF", rating: 4.2 }
    ]
  };

  const tabs = [
    { id: 'bestsellers', label: '🔥 Best Sellers', count: '50+' },
    { id: 'newArrivals', label: '✨ New Arrivals', count: '25+' },
    { id: 'deals', label: '💥 Hot Deals', count: '30+' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-thin text-black mb-6">
            Featured <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium laptops and desktops
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products[activeTab].map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.badge === 'Best Seller' ? 'bg-red-100 text-red-600' :
                  product.badge === 'New' ? 'bg-green-100 text-green-600' :
                  product.badge.includes('OFF') ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {product.badge}
                </span>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Product Image */}
              <div className="relative h-48 mb-4 bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-2">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-orange-400' : 'text-gray-300'}>★</span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-lg text-black mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-black">{product.price}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors duration-300 font-medium">
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-xl hover:border-orange-500 hover:text-orange-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products/allProducts" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;