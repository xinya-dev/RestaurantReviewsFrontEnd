"use client"; // Make layout a Client Component to use hooks

import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import React, { ReactNode } from "react";
import SectionHeroArchivePage from "../(server-components)/SectionHeroArchivePage";
import { SearchTab } from "../(client-components)/(HeroSearchForm)/RRSearchForm";
import { useSearchParams } from 'next/navigation'; // Import the hook

// Define the expected structure of props (searchParams no longer needed here)
interface LayoutProps {
  children: ReactNode;
  params: {}; 
}

// Define valid SearchTab values explicitly for validation
const validSearchTabs: SearchTab[] = [
  "Near Me", "International Cuisine", "Fine Dining", "Casual Dining", 
  "Fast Food", "Child Friendly", "Favourite Foods", "Healthy Foods", 
  "Cafés & Coffee", "Todays Specials"
];

// Helper function to check if a string is a valid SearchTab
const isValidSearchTab = (value: string | null): value is SearchTab => {
  return typeof value === 'string' && (validSearchTabs as string[]).includes(value);
};

const Layout = ({ children, params }: LayoutProps) => {
  // Use the hook to get searchParams
  const searchParams = useSearchParams();
  

  // Extract search parameters from the hook result
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('query');
  const distanceParam = searchParams.get('distance');
  const filtersParam = searchParams.get('filters');

  // Debugging: Log the extracted categoryParam
  console.log("Layout hook categoryParam:", categoryParam);

  // Determine values to pass down, VALIDATING categoryParam
  const currentTabValue: SearchTab = isValidSearchTab(categoryParam) 
    ? categoryParam 
    : "Near Me"; // Default to "Near Me" if param is missing or invalid
    
  const defaultSearchTextValue = queryParam || "";
  const defaultSearchDistanceValue = distanceParam || "0-20"; // Default distance
  const defaultSelectedItemsValue = filtersParam ? filtersParam.split(',') : []; // Split filters or default to empty array
  const tabClassNameValue = "p-2 h-[95px] w-[95px] rounded-1xl transition-all duration-200 ";

  // Debugging: Log the values being passed
  console.log("Layout - Passing to SectionHero:", {
    currentTabValue,
    defaultSearchTextValue,
    defaultSearchDistanceValue,
    defaultSelectedItemsValue,
    tabClassNameValue
  });

  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism className="absolute inset-x-0 md:top- xl:top- min-h-170 max-h-200 pl-20 py-24 flex overflow-hidden z-0 h-180" image="/images/banner1.jpg" spanClassName="hidden"/>

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28 mt-5">
        {/* SectionHeroArchivePage might need to be a Client Component or adjusted */}
        {/* if it relies on props derived from server-only data, but let's try first */}
        <SectionHeroArchivePage 
          currentPage={currentTabValue} 
          currentTab={currentTabValue}
          defaultSearchText={defaultSearchTextValue}
          defaultSearchDistance={defaultSearchDistanceValue}
          defaultSelectedItems={defaultSelectedItemsValue}
          tabClassName={tabClassNameValue}
        />
      </div>

      {children} {/* Render children passed from the page */}

      {/* Rest of the layout sections */}
      <div className="container overflow-hidden">
        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-28" />
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div>
    </div>
  );
};

export default Layout;
