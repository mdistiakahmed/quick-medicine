'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBengali, setIsBengali] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // You can replace this with your actual search logic
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const translations = {
    title: 'Find Drugs & Conditions',
    placeholder: 'ওষুধের নাম, রোগের নাম, বা পিলের নাম্বার লিখুন...',
    search: 'Search',
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {translations.title}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <label className="sr-only" htmlFor="search-input">
              {translations.placeholder}
            </label>
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={translations.placeholder}
              className="w-full border border-gray-300 rounded-l-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoCapitalize="off"
              autoCorrect="off"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {translations.search}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;