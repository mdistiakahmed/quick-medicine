'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { summary } from '@/data/productSummary';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const [fuse, setFuse] = useState<Fuse<any> | null>(null);

  useEffect(() => {
    // Initialize Fuse with the product summary data
    const options = {
      keys: ['name', 'strength'],
      threshold: 0.4,
      includeScore: true,
    };
    setFuse(new Fuse(summary, options));
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (fuse && value.trim().length > 0) {
      const results = fuse.search(value);
      // Get top 10 matches
      setSuggestions(results.slice(0, 10).map(result => result.item));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // If there are suggestions, navigate to the first one
      if (suggestions.length > 0) {
        router.push(`/drugs-atoz/${suggestions[0].id}`);
      } else {
        // Or perform a search with the query
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    router.push(`/drugs-atoz/${suggestion.id}`);
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
          <div className="relative">
            <div className="relative flex items-center">
              <label className="sr-only" htmlFor="search-input">
                {translations.placeholder}
              </label>
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={translations.placeholder}
                className="w-full border border-gray-300 rounded-l-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
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
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                    onMouseDown={() => handleSuggestionClick(item)}
                  >
                    <div className="font-medium text-gray-900">{item.name}</div>
                    {item.strength && (
                      <div className="text-sm text-gray-500">{item.strength}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;