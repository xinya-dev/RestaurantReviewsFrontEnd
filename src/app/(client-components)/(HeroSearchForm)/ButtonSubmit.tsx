import { PathName } from "@/routers/types";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  href?: PathName;
  searchParams?: Record<string, string>;
  type?: "button" | "submit";
  className?: string;
}

const SEARCH_FLAG_KEY = "nc_should_scroll_to_results";

const ButtonSubmit: FC<Props> = ({ 
  href = "/listing-stay-map" as PathName, 
  searchParams = {},
  type = "submit",
  className = ""
}) => {
  const router = useRouter();
  const [searchUrl, setSearchUrl] = useState<string>(href);

  // Always update the URL when search parameters change
  useEffect(() => {
    // Generate URL with query parameters
    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const finalUrl = `${href}${queryString ? `?${queryString}` : ''}`;
    setSearchUrl(finalUrl);
  }, [searchParams, href]);
  
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Set flag in localStorage to indicate we should scroll after navigation
    localStorage.setItem(SEARCH_FLAG_KEY, "true");
    
    // For submit type, attempt to submit the form
    if (type === "submit") {
      const form = (e.target as HTMLElement).closest('form');
      if (form) {
        // Use native form submission to trigger all form event handlers
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        return;
      }
    }
    
    // If not in a form or type is button, navigate directly with current parameters
    console.log("Navigating to:", searchUrl);
    router.push(searchUrl as any);
    
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
      onClick={handleClick}
      type={type}
      className={`h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none ${className}`}
      aria-label="Search"
    >
      <span className="mr-3 md:hidden">Search</span>
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
    </button>
  );
};

export default ButtonSubmit;
