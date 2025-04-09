import { PathName } from "@/routers/types";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  href?: PathName;
  searchParams?: Record<string, string>;
  type?: "button" | "submit";
  className?: string;
}

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
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
