"use client";

import React, { FC, useState, useRef, useEffect, Fragment } from "react";
import { MagnifyingGlassIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";

interface Restaurant {
  name: string;
  cuisine: string;
  rating?: number;
  checked?: boolean;
}

interface RestaurantNameDropdownProps {
  onChange?: (restaurants: Restaurant[]) => void;
}

const MAX_RECENT_SEARCHES = 5;

// Sample restaurant data (in a real app, this would come from an API)
const sampleRestaurants: Restaurant[] = [
  { name: "The Italian Kitchen", cuisine: "Italian", rating: 4.5, checked: false },
  { name: "Sushi Master", cuisine: "Japanese", rating: 4.8, checked: false },
  { name: "Taj Mahal", cuisine: "Indian", rating: 4.3, checked: false },
  { name: "Golden Dragon", cuisine: "Chinese", rating: 4.6, checked: false },
  { name: "Le Petit Bistro", cuisine: "French", rating: 4.7, checked: false },
  { name: "El Mariachi", cuisine: "Mexican", rating: 4.4, checked: false },
  { name: "Thai Orchid", cuisine: "Thai", rating: 4.2, checked: false },
  { name: "Greek Islands", cuisine: "Greek", rating: 4.5, checked: false },
  { name: "Burger House", cuisine: "American", rating: 4.1, checked: false },
  { name: "Pho Delicious", cuisine: "Vietnamese", rating: 4.4, checked: false }
];

const RestaurantNameDropdown: FC<RestaurantNameDropdownProps> = ({ onChange }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [recentSearches, setRecentSearches] = useState<Restaurant[]>([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedRecent = localStorage.getItem('recentRestaurantSearches');
    if (savedRecent) {
      const parsedRecent = JSON.parse(savedRecent) as Restaurant[];
      const updatedRecent = parsedRecent.map(rec => ({
        ...rec,
        checked: selectedRestaurants.some(sel => sel.name === rec.name)
      }));
      setRecentSearches(updatedRecent);
    }
  }, [selectedRestaurants]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // setShowPopover(false); // Popover handles its own closing
        // Let's not close tooltip on outside click, only on leave
      }
    };

    //if (showPopover) { // Popover handles its own outside click
    //  document.addEventListener('click', handleClickOutside);
    //}

    //return () => {
    //  document.removeEventListener('click', handleClickOutside);
    //};
  }, [/* showPopover */]);

  // Filter restaurants based on search
  useEffect(() => {
    if (searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      const filtered = sampleRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm)
      );
       // Add checked state to filtered results
       const checkedFiltered = filtered.map(res => ({
         ...res,
         checked: selectedRestaurants.some(sel => sel.name === res.name)
       }));
      setFilteredRestaurants(checkedFiltered.slice(0, 10));
    } else {
      setFilteredRestaurants([]);
    }
  }, [searchValue, selectedRestaurants]);

  const handleRestaurantToggle = (restaurantName: string, isChecked: boolean) => {
     const targetRestaurant = sampleRestaurants.find(r => r.name === restaurantName) || recentSearches.find(r => r.name === restaurantName);
     if (!targetRestaurant) return;

     let newSelected;
     if (isChecked) {
       newSelected = [...selectedRestaurants, { ...targetRestaurant, checked: true }];
     } else {
       newSelected = selectedRestaurants.filter(r => r.name !== restaurantName);
     }
     setSelectedRestaurants(newSelected);

     // Update recent searches (only add if selecting)
     if (isChecked) {
       const newRecent = [targetRestaurant, ...recentSearches.filter(item => item.name !== restaurantName)].slice(0, MAX_RECENT_SEARCHES);
       setRecentSearches(newRecent);
       localStorage.setItem('recentRestaurantSearches', JSON.stringify(newRecent));
     }

     onChange?.(newSelected);
  };

  const handleTooltipDeselect = (restaurantName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleRestaurantToggle(restaurantName, false);
  };

  const handleMouseEnterButton = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setIsTooltipOpen(true);
  };

  const handleMouseLeaveButton = () => {
    tooltipTimeoutRef.current = setTimeout(() => setIsTooltipOpen(false), 150);
  };

  const handleMouseEnterTooltip = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
  };

  const handleMouseLeaveTooltip = () => {
    tooltipTimeoutRef.current = setTimeout(() => setIsTooltipOpen(false), 150);
  };

  const currentlySelected = selectedRestaurants;

  return (
    <Popover ref={containerRef} className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            className={`flex items-center gap-1.5 px-1 py-1.5 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm text-gray-600 whitespace-nowrap transition-colors ${
              open ? "bg-indigo-100" : ""
            }`}
          >
            <MagnifyingGlassIcon className="w-8 h-8 stroke-2 text-green-600" />
            <span className="font-medium">Restaurant Name</span>
            <span className="text-xs text-indigo-500">
              ({currentlySelected.length})
            </span>
          </Popover.Button>

          {/* Selected Restaurants Tooltip */}
          {isTooltipOpen && !open && currentlySelected.length > 0 && (
             <div
              onMouseEnter={handleMouseEnterTooltip}
              onMouseLeave={handleMouseLeaveTooltip}
              className="absolute z-[9999] w-64 bg-white dark:bg-neutral-800 mt-2 rounded-xl shadow-xl border dark:border-neutral-700"
            >
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Search by Name</div>
              <div className="px-3 pb-2 text-sm text-neutral-600 dark:text-neutral-300">
                Looking for a specific restaurant? Search by name to find your favorite dining spots quickly.
              </div>
              <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent px-3 pb-2">
                {currentlySelected.map((restaurant) => (
                  <div key={restaurant.name} className="flex items-center justify-between py-1 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="truncate" title={restaurant.name}>{restaurant.name}</span>
                    <button
                      onClick={(e) => handleTooltipDeselect(restaurant.name, e)}
                      className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 flex-shrink-0 ml-1"
                      aria-label={`Deselect ${restaurant.name}`}
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
             <Popover.Panel className="fixed z-[9999] w-screen max-w-4xl px-4 mt-3 left-1/2 -translate-x-1/2 top-[200px] sm:px-0">
               <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                 <div className="relative flex flex-col px-6 py-6 space-y-6">
                   {/* Search Input */}
                   <div className="relative">
                     <input
                       type="text"
                       placeholder="Search restaurants..."
                       className="w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                       value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                     />
                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                   </div>
    
                   {/* Selected Restaurants Tags */}
                   {selectedRestaurants.length > 0 && (
                     <div className="border-b border-neutral-200 pb-4">
                       <div className="text-xs font-semibold text-neutral-500 uppercase mb-2">Selected</div>
                       <div className="flex flex-wrap gap-2">
                         {selectedRestaurants.map((restaurant) => (
                           <span key={restaurant.name} className="flex items-center bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md text-xs">
                             {restaurant.name}
                             <XMarkIcon
                               className="w-3 h-3 ml-1 cursor-pointer hover:text-indigo-900"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleRestaurantToggle(restaurant.name, false);
                               }}
                             />
                           </span>
                         ))}
                       </div>
                     </div>
                   )}
    
                   <div className="overflow-y-auto max-h-[234px] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2">
                     {/* Search Results */}
                     {filteredRestaurants.length > 0 && (
                       <div className="mb-4">
                         <div className="text-xs font-semibold text-neutral-500 uppercase mb-2">Search Results</div>
                         <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                           {filteredRestaurants.map((restaurant) => (
                             <div
                               key={restaurant.name}
                               className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                             >
                               <Checkbox
                                 name={restaurant.name}
                                 className="ml-auto flex-shrink-0"
                                 checked={selectedRestaurants.some(r => r.name === restaurant.name)}
                                 onChange={(checked) => handleRestaurantToggle(restaurant.name, checked)}
                                 label={(
                                   <div className="flex flex-col">
                                     <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate" title={restaurant.name}>{restaurant.name}</div>
                                     <div className="text-xs text-neutral-500 truncate" title={restaurant.cuisine}>{restaurant.cuisine}</div>
                                     {restaurant.rating && (
                                       <div className="flex items-center gap-1 mt-0.5">
                                         <span className="text-xs font-medium text-yellow-500">★</span>
                                         <span className="text-xs text-neutral-600">{restaurant.rating}</span>
                                       </div>
                                     )}
                                   </div>
                                 )} labelClassName="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                               />
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
    
                     {/* Recent Searches */}
                     {!searchValue && recentSearches.length > 0 && (
                       <div>
                         <div className="text-xs font-semibold text-neutral-500 uppercase mb-2">Recent Searches</div>
                         <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                           {recentSearches.map((restaurant) => (
                             <div
                               key={`recent-${restaurant.name}`}
                               className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                             >
                               <Checkbox
                                 name={`recent-${restaurant.name}`}
                                 className="ml-auto flex-shrink-0"
                                 checked={selectedRestaurants.some(r => r.name === restaurant.name)}
                                 onChange={(checked) => handleRestaurantToggle(restaurant.name, checked)}
                                 label={(
                                   <div className="flex items-center gap-2">
                                     <ClockIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                     <div className="flex-1 min-w-0">
                                       <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate" title={restaurant.name}>{restaurant.name}</div>
                                       <div className="text-xs text-neutral-500 truncate" title={restaurant.cuisine}>{restaurant.cuisine}</div>
                                       {restaurant.rating && (
                                         <div className="flex items-center gap-1 mt-0.5">
                                           <span className="text-xs font-medium text-yellow-500">★</span>
                                           <span className="text-xs text-neutral-600">{restaurant.rating}</span>
                                         </div>
                                       )}
                                     </div>
                                   </div>
                                 )} labelClassName="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                               />
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
    
                     {/* Messages */}
                     {searchValue && filteredRestaurants.length === 0 && (
                       <div className="text-neutral-500 text-center py-4">No restaurants found</div>
                     )}
                     {!searchValue && recentSearches.length === 0 && !selectedRestaurants.length && (
                       <div className="text-neutral-500 text-center py-4">Type to search restaurants</div>
                     )}
                   </div>
                 </div>
    
                 <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                   <button
                     onClick={() => {
                       setSelectedRestaurants([]);
                       const updatedRecent = recentSearches.map(r => ({...r, checked: false}));
                       setRecentSearches(updatedRecent);
                       if (!searchValue) setFilteredRestaurants([]);
                       onChange?.([]);
                     }}
                     className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                   >
                     Clear
                   </button>
                   <button
                     onClick={() => close()}
                     className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                   >
                     Apply
                   </button>
                 </div>
               </div>
             </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RestaurantNameDropdown; 