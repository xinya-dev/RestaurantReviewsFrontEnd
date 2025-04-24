"use client";

import React, { FC, Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Checkbox from '@/shared/Checkbox';
import { StarIcon } from '@heroicons/react/24/solid'; // Assuming solid star for rating

// --- Interfaces for Suggestion Types ---
interface BaseSuggestion {
  id: string | number;
  type: 'restaurant' | 'dish' | 'text' | 'category' | 'didyoumean';
}

interface RestaurantSuggestion extends BaseSuggestion {
  type: 'restaurant';
  name: string;
  cuisine: string;
  imageUrl: string;
  rating?: number;
  reviewSnippet?: string; // Optional: Short review text
  profileLink: string;
  reviewsLink: string;
  menuLink?: string; // Optional
}

interface DishSuggestion extends BaseSuggestion {
  type: 'dish';
  name: string;
  imageUrl: string;
  description?: string;
  restaurantsLink: string; // Link to restaurants serving this
}

interface TextSuggestion extends BaseSuggestion {
  type: 'text';
  text: string;
  isBold?: boolean; // For highlighting matches like 'lego **sets**'
}

interface CategorySuggestion extends BaseSuggestion {
  type: 'category';
  name: string; // e.g., "Italian Restaurants"
  icon?: React.ElementType; // Optional icon
  link: string;
}

interface DidYouMeanSuggestion extends BaseSuggestion {
  type: 'didyoumean';
  correctedQuery: string;
}

export type Suggestion = RestaurantSuggestion | DishSuggestion | TextSuggestion | CategorySuggestion | DidYouMeanSuggestion;

// --- Mock Data (Replace with API calls) ---
const mockRestaurants: RestaurantSuggestion[] = [
  { id: 1, type: 'restaurant', name: 'The Gourmet Place', cuisine: 'Italian', imageUrl: '/images/restaurants/r1.jpg', rating: 4.5, profileLink: '#', reviewsLink: '#', menuLink: '#', reviewSnippet: 'Amazing pasta, great ambiance...' },
  { id: 2, type: 'restaurant', name: 'Sushi Express', cuisine: 'Japanese', imageUrl: '/images/restaurants/r2.jpg', rating: 4.8, profileLink: '#', reviewsLink: '#'},
  { id: 3, type: 'restaurant', name: 'Curry House', cuisine: 'Indian', imageUrl: '/images/restaurants/r3.jpg', rating: 4.2, profileLink: '#', reviewsLink: '#', menuLink: '#' },
];

const mockDishes: DishSuggestion[] = [
  { id: 10, type: 'dish', name: 'Margherita Pizza', imageUrl: '/images/dishes/pizza.jpg', description: 'Classic Italian pizza', restaurantsLink: '#' },
  { id: 11, type: 'dish', name: 'Tandoori Chicken', imageUrl: '/images/dishes/tandoori.jpg', description: 'Spiced Indian grilled chicken', restaurantsLink: '#' },
];

// --- Component Props ---
interface PredictiveSearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void; // Function to close the dropdown
  onSelectSuggestion: (suggestion: Suggestion) => void; // Callback when a suggestion is clicked
}

const PredictiveSearchDropdown: FC<PredictiveSearchDropdownProps> = ({
  query,
  isOpen,
  onClose,
  onSelectSuggestion
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  // Default filters state
  const [filters, setFilters] = useState({
    takeAway: true,
    dining: true,
    childFriendly: true,
  });

  // Simulate fetching suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const lowerQuery = query.toLowerCase();

    // Basic simulation: Combine suggestions based on query
    const fetchTimeout = setTimeout(() => {
      let results: Suggestion[] = [];

      // Text suggestions (like Google's suggestions)
      results.push({ id: 's1', type: 'text', text: query });
      if (lowerQuery.includes('lego')) {
         results.push({ id: 's2', type: 'text', text: 'lego sets', isBold: true });
         results.push({ id: 's3', type: 'text', text: 'lego star wars' });
         results.push({ id: 's4', type: 'text', text: 'lego ninjago' });
         results.push({ id: 's5', type: 'text', text: 'lego harry potter hogwarts castle' });
      } else if (lowerQuery.includes('pizza')) {
         results.push({ id: 's6', type: 'text', text: 'pizza near me' });
         results.push({ id: 's7', type: 'text', text: 'pizza delivery' });
      }


      // Filter mock data (basic includes check)
      const matchingRestaurants = mockRestaurants.filter(r =>
        r.name.toLowerCase().includes(lowerQuery) || r.cuisine.toLowerCase().includes(lowerQuery)
      );
      const matchingDishes = mockDishes.filter(d =>
        d.name.toLowerCase().includes(lowerQuery)
      );

      // Combine results (show text suggestions first, then rich results)
      results = [...results, ...matchingRestaurants, ...matchingDishes];

      // Basic "Did you mean" simulation
      if (lowerQuery === 'berger' && !results.some(s => s.type === 'restaurant' || s.type === 'dish')) {
        results.push({ id: 'dym1', type: 'didyoumean', correctedQuery: 'Burger' });
      }

      setSuggestions(results.slice(0, 10)); // Limit results
      setLoading(false);
    }, 300); // Simulate network delay

    return () => clearTimeout(fetchTimeout);
  }, [query]);

  if (!isOpen || (!loading && suggestions.length === 0 && !query.trim())) {
     // Don't render if not open or if open but no query/suggestions (unless loading)
     // Exception: Keep open if loading is true to show loader
     if(!loading && !query.trim()) return null;
     if(!loading && suggestions.length === 0) return null; // Hide if query exists but no results found after load
  }


  const renderSuggestion = (suggestion: Suggestion) => {
    switch (suggestion.type) {
      case 'text':
        return (
          <div key={suggestion.id} className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-sm" onClick={() => onSelectSuggestion(suggestion)}>
            {/* Crude bolding based on flag */}
            {suggestion.isBold ? (
              <span>{suggestion.text.split('**')[0]}<strong>{suggestion.text.split('**')[1]}</strong></span>
            ) : suggestion.text}
          </div>
        );
      case 'restaurant':
        return (
           <Link key={suggestion.id} href={{ pathname: suggestion.profileLink }} className="block px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => onSelectSuggestion(suggestion)}>
            <div className="flex items-center gap-3">
              <Image src={suggestion.imageUrl || '/images/placeholder.png'} alt={suggestion.name} width={40} height={40} className="w-10 h-10 rounded object-cover flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{suggestion.name}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{suggestion.cuisine}</div>
                 {suggestion.rating && (
                   <div className="flex items-center mt-0.5">
                     <StarIcon className="w-3.5 h-3.5 text-yellow-500" />
                     <span className="text-xs text-neutral-600 dark:text-neutral-400 ml-1">{suggestion.rating.toFixed(1)}</span>
                   </div>
                 )}
              </div>
            </div>
            {suggestion.reviewSnippet && <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">{suggestion.reviewSnippet}</p>}
            {/* Quick Links (Example) */}
            {/* <div className="mt-1 flex gap-2">
              <span className="text-xs text-blue-600 hover:underline">Visit Profile</span>
              <span className="text-xs text-blue-600 hover:underline">Read Reviews</span>
            </div> */}
          </Link>
        );
       case 'dish':
         return (
           <Link key={suggestion.id} href={{ pathname: suggestion.restaurantsLink }} className="block px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => onSelectSuggestion(suggestion)}>
             <div className="flex items-center gap-3">
               <Image src={suggestion.imageUrl || '/images/placeholder.png'} alt={suggestion.name} width={40} height={40} className="w-10 h-10 rounded object-cover flex-shrink-0" />
               <div className="flex-grow min-w-0">
                 <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{suggestion.name}</div>
                 {suggestion.description && <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{suggestion.description}</div>}
               </div>
             </div>
           </Link>
         );
      case 'didyoumean':
        return (
          <div key={suggestion.id} className="px-4 py-2 text-sm italic text-neutral-600 dark:text-neutral-400">
            Did you mean: <span className="font-semibold cursor-pointer hover:text-indigo-600" onClick={() => console.log("Correct query to:", suggestion.correctedQuery)}>{suggestion.correctedQuery}</span>?
          </div>
        );
      // Add cases for 'category' if needed
      default:
        return null;
    }
  };

  // Split suggestions roughly like the image
  const textSuggestions = suggestions.filter(s => s.type === 'text' || s.type === 'didyoumean');
  const richSuggestions = suggestions.filter(s => s.type === 'restaurant' || s.type === 'dish');

  return (
    <div className="absolute z-50 top-full left-0 right-0 mt-1 w-full shadow-lg rounded-b-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden max-h-[60vh] flex flex-col">
       {loading && <div className="p-4 text-center text-sm text-neutral-500">Loading...</div>}
       {!loading && query.trim() && suggestions.length === 0 && (
        <div className="p-4 text-center text-sm text-neutral-500">No results found for "{query}"</div>
       )}
      <div className="flex flex-grow overflow-y-auto">
        {/* Left Panel: Text Suggestions */}
        <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-700 py-2 flex-shrink-0">
          <div className="px-4 pb-2 text-xs font-semibold text-neutral-500 uppercase">Suggestions</div>
          {textSuggestions.length > 0 ? textSuggestions.map(renderSuggestion) : <div className="px-4 text-sm text-neutral-400 italic">Type to see suggestions...</div>}
        </div>

        {/* Right Panel: Rich Results */}
        <div className="w-2/3 py-2 flex-grow overflow-y-auto">
           <div className="px-4 pb-2 text-xs font-semibold text-neutral-500 uppercase">Restaurants & Dishes</div>
           {richSuggestions.length > 0 ? richSuggestions.map(renderSuggestion) : <div className="px-4 text-sm text-neutral-400 italic">{query.trim() ? 'No matching items.' : 'Results appear here.'}</div>}
        </div>
      </div>

      {/* Footer with Default Filters */}
      <div className="flex-shrink-0 p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-start gap-4">
         <Checkbox
            name="filter-takeaway"
            label="Take Away"
            checked={filters.takeAway}
            onChange={(checked) => setFilters(f => ({ ...f, takeAway: checked }))}
            className="text-sm"
            labelClassName="text-xs"
         />
         <Checkbox
            name="filter-dining"
            label="Dining"
            checked={filters.dining}
            onChange={(checked) => setFilters(f => ({ ...f, dining: checked }))}
            className="text-sm"
            labelClassName="text-xs"
          />
         <Checkbox
            name="filter-childfriendly"
            label="Child Friendly"
            checked={filters.childFriendly}
            onChange={(checked) => setFilters(f => ({ ...f, childFriendly: checked }))}
            className="text-sm"
            labelClassName="text-xs"
         />
         {/* Maybe add a "Search for 'query'" button here later */}
         {/* <button className="ml-auto text-sm text-indigo-600 hover:underline">Search for "{query}"</button> */}
      </div>
    </div>
  );
};

export default PredictiveSearchDropdown; 