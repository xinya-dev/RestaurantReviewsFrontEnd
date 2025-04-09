"use client";

import { type FC } from "react";
import RRSearchForm from "../(client-components)/(HeroSearchForm)/RRSearchForm";
import { SearchTab } from "../(client-components)/(HeroSearchForm)/RRSearchForm";
import { useSearchParams } from "next/navigation";

export interface SectionHeroListingProps {
  className?: string;
}

const SectionHeroListing: FC<SectionHeroListingProps> = ({ className = "" }) => {
  // Get the current search params to pre-fill the search form
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category");
  
  // Convert the category param to a valid SearchTab or use default
  const validCategories: SearchTab[] = [
    "Near Me", 
    "International Cuisine", 
    "Fine Dine", 
    "Casual Dining", 
    "Fast Food", 
    "Child Friendly", 
    "Favourite Foods", 
    "Healthy Foods", 
    "Cafés & Coffee", 
    "Todays Specials"
  ];
  
  const currentTab: SearchTab = categoryParam && validCategories.includes(categoryParam as SearchTab) 
    ? (categoryParam as SearchTab) 
    : "Near Me";
  
  return (
    <div className={`nc-SectionHeroListing relative ${className}`}>
      {/* Content */}
      <div className="relative z-10">
        <div className="flex-shrink-0 pb-6 lg:pb-4 text-center">
          <h2 className="font-medium text-3xl md:text-4xl leading-none text-center text-neutral-900 dark:text-white">
            Discover Great Restaurants
          </h2>
          <span className="block mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Find and review the best restaurants, cafes, and dining spots in your area
          </span>
        </div>
        <div className="max-w-7xl mx-auto mt-0">
          <RRSearchForm currentTab={currentTab} />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroListing; 