import React from 'react'

const SearchBar = () => {
    return (
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Drugs &amp; Conditions</h1>
    
            <form action="/search.php" method="get" autoComplete="off" role="search">
              <div className="relative flex items-center">
                <label className="sr-only" htmlFor="livesearch-main">
                  Search Drugs.com
                </label>
                <input
                  type="text"
                  id="livesearch-main"
                  name="searchterm"
                  placeholder="Enter a drug name, condition, pill imprint, etc."
                  className="w-full border border-gray-300 rounded-l-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-md transition"
                  aria-label="Search"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>
      );
}

export default SearchBar