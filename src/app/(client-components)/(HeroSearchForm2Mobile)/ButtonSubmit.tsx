import React, { FC } from "react";
import { PathName } from "@/routers/types";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  onClick?: () => void;
  href?: PathName;
  searchParams?: Record<string, string>;
}

const ButtonSubmit: FC<Props> = ({
  className = "",
  onClick = () => {},
  href = "/listing-stay-map" as PathName,
  searchParams = {},
}) => {
  const router = useRouter();

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
    
    // Navigate to the search results page
    router.push(finalUrl as any);
    
    // Also call any additional onClick handler
    onClick();
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
