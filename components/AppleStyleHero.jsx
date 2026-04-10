"use client";

import Image from "next/image";
import Link from "next/link";

const AppleStyleHero = () => {
  return (
    <div className="bg-black">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10"></div>
        <Image
          src="/svgs/hero.png"
          alt="Premium Laptops"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-thin mb-6 tracking-tight">
            MacBook Pro
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
            Supercharged by M3 Pro and M3 Max.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/allProducts"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="/products/allProducts"
              className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500">
              <h2 className="text-4xl font-thin text-black mb-4">
                MacBook Air
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Lean. Mean. M3 machine.
              </p>
              <div className="relative h-64 mb-8">
                <Image
                  src="/svgs/hero.png"
                  alt="MacBook Air"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/products/allProducts"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Learn more →
                </Link>
                <Link
                  href="/products/allProducts"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Buy →
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500">
              <h2 className="text-4xl font-thin text-black mb-4">iMac</h2>
              <p className="text-xl text-gray-600 mb-8">
                Packed with M3. Unpacked thinking.
              </p>
              <div className="relative h-64 mb-8">
                <Image
                  src="/svgs/hero.png"
                  alt="iMac"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/products/allProducts"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Learn more →
                </Link>
                <Link
                  href="/products/allProducts"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Buy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-thin text-white mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Gaming Laptops
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience ultimate performance with our premium gaming collection
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300"
              >
                <div className="relative h-48 mb-6">
                  <Image
                    src="/svgs/hero.png"
                    alt={`Gaming Laptop ${item}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">
                  ROG Strix
                </h3>
                <p className="text-gray-400 mb-4">From Rs. 299,999</p>
                <Link
                  href="/products/allProducts"
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleStyleHero;
