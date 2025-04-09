import React, { FC, useEffect } from "react";
import { PathName } from "@/routers/types";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  onClick?: () => void;
  href?: PathName;
  searchParams?: Record<string, string>;
}

const SEARCH_FLAG_KEY = "nc_should_scroll_to_results";

const ButtonSubmit: FC<Props> = ({
  className = "",
  onClick = () => {},
  href = "/listing-stay-map" as PathName,
  searchParams = {},
}) => {
  const router = useRouter();
  
  // Check on component mount if we need to scroll
  useEffect(() => {
    const shouldScroll = localStorage.getItem(SEARCH_FLAG_KEY);
    if (shouldScroll === "true") {
      // Clear the flag immediately
      localStorage.removeItem(SEARCH_FLAG_KEY);
      
      // Add a delay to allow the page to fully render
      setTimeout(() => {
        scrollToResultsSection();
      }, 1000);
    }
  }, []);
  
  // Function to scroll to results section
  const scrollToResultsSection = () => {
    // Try multiple selectors to find the right section
    const sectionElement = 
      document.querySelector('.SectionGridHasMap') || 
      document.querySelector('.listing-stay-map') ||
      document.getElementById('restaurant-results');
    
    if (sectionElement) {
      // Smooth scroll to the element
      sectionElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      console.log('Scrolled to results section');
    } else {
      console.log('Could not find results section to scroll to');
      // Fallback: scroll some distance down the page
      window.scrollTo({
        top: 400, // Approximate position where results might be
        behavior: 'smooth'
      });
    }
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Generate URL with query parameters
    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const finalUrl = `${href}${queryString ? `?${queryString}` : ''}`;
    
    // Set flag in localStorage to indicate we should scroll after navigation
    localStorage.setItem(SEARCH_FLAG_KEY, "true");
    
    // Navigate to the search results page
    router.push(finalUrl as any);
    
    // Also call any additional onClick handler
    onClick();
    
    // For same-page navigation, we might need to scroll directly
    setTimeout(() => {
      // Check if flag is still there (navigation might not have caused a page reload)
      if (localStorage.getItem(SEARCH_FLAG_KEY) === "true") {
        localStorage.removeItem(SEARCH_FLAG_KEY);
        scrollToResultsSection();
      }
    }, 1000);
  };

  return (
    <button
      type="submit"
      onClick={handleSearch}
      className={`flex-shrink-0 px-4 py-2.5 cursor-pointer rounded-xl bg-primary-6000 flex items-center justify-center text-neutral-50 focus:outline-none ${className} relative z-20`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span className="ml-2">Search</span>
    </button>
  );
};

export default ButtonSubmit;
