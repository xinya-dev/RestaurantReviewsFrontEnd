"use client";

import React, { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { GlobeAltIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface CuisineItem {
  name: string;
  description: string;
  checked: boolean;
  flagCode: string;
}

// const cuisines: CuisineItem[] = [
//   {
//     name: "Italian",
//     description: "Pasta, pizza, and Mediterranean flavors",
//     checked: true,
//     flagCode: "it"
//   },
//   {
//     name: "Chinese",
//     description: "Traditional Chinese dishes and flavors",
//     checked: true,
//     flagCode: "cn"
//   },
//   {
//     name: "Indian",
//     description: "Spicy curries and traditional Indian cuisine",
//     checked: false,
//     flagCode: "in"
//   },
//   {
//     name: "Japanese",
//     description: "Sushi, ramen, and traditional Japanese dishes",
//     checked: false,
//     flagCode: "jp"
//   },
//   {
//     name: "Mexican",
//     description: "Tacos, burritos, and authentic Mexican flavors",
//     checked: false,
//     flagCode: "mx"
//   },
//   {
//     name: "Thai",
//     description: "Spicy and aromatic Thai cuisine",
//     checked: false,
//     flagCode: "th"
//   },
//   {
//     name: "French",
//     description: "Classic French cuisine and pastries",
//     checked: false,
//     flagCode: "fr"
//   },
//   {
//     name: "Korean",
//     description: "Korean BBQ and traditional dishes",
//     checked: false,
//     flagCode: "kr"
//   },
//   {
//     name: "Spanish",
//     description: "Tapas and traditional Spanish dishes",
//     checked: false,
//     flagCode: "es"
//   },
//   {
//     name: "Greek",
//     description: "Mediterranean and traditional Greek cuisine",
//     checked: false,
//     flagCode: "gr"
//   },
//   {
//     name: "Vietnamese",
//     description: "Fresh and flavorful Vietnamese dishes",
//     checked: false,
//     flagCode: "vn"
//   },
//   {
//     name: "Lebanese",
//     description: "Middle Eastern and Lebanese specialties",
//     checked: false,
//     flagCode: "lb"
//   }
// ];

const cuisines: CuisineItem[] = [
  
  {
    name: "Australian",
    description: "Modern Australian and Indigenous cuisine",
    checked: true,
    flagCode: "au",

  },
  {
    name: "Italian",
    description: "Pizza, Pasta, and Mediterranean flavors",
    checked: true,
    flagCode: "it",
    
  },
  {
    name: "Thai",
    description: "Authentic Thai dishes and street food",
    checked: true,
    flagCode: "th",
    
  },
  {
    name: "Indian",
    description: "Traditional Indian curries and tandoor",
    checked: true,
    flagCode: "in",
    
  },
  {
    name: "Chinese",
    description: "Regional Chinese specialties",
    checked: true,
    flagCode: "cn",
    
  },
  {
    name: "Greek",
    description: "Mediterranean Greek delicacies",
    checked: true,
    flagCode: "gr",

  },
  {
    name: "American",
    description: "Classic American comfort food",
    checked: true,
    flagCode: "us",

  },
  {
    name: "English",
    description: "Traditional British cuisine",
    checked: true,
    flagCode: "gb",
  },
  {
    name: "Japanese",
    description: "Sushi, Ramen, and Japanese dishes",
    checked: true,
    flagCode: "jp",
    
  },
  {
    name: "Vietnamese",
    description: "Authentic Vietnamese street food",
    checked: true,
    flagCode: "vn",
    
  },
  {
    name: "Mexican",
    description: "Traditional Mexican flavors",
    checked: true,
    flagCode: "mx",
    
  },
  {
    name: "French",
    description: "Classic French cuisine",
    checked: true,
    flagCode: "fr",
   
  },
  {
    name: "Spanish",
    description: "Spanish tapas and paella",
    checked: true,
    flagCode: "es",
   
  },
  {
    name: "Indonesian",
    description: "Traditional Indonesian dishes",
    checked: true,
    flagCode: "id",

  },
  {
    name: "Philippines",
    description: "Filipino specialties",
    checked: true,
    flagCode: "ph",
    
  },
  {
    name: "Middle Eastern",
    description: "Middle Eastern delicacies",
    checked: true,
    flagCode: "ae",
  
  },
  {
    name: "Singapore",
    description: "Singapore's diverse cuisine",
    checked: true,
    flagCode: "sg",
  
  },
  {
    name: "Arab",
    description: "Traditional Arab cuisine",
    checked: true,
    flagCode: "sa",
    
  }
];

interface InternationalCuisinesDropdownProps {
  onChange?: (selectedCuisines: string[]) => void;
}

const InternationalCuisinesDropdown: React.FC<InternationalCuisinesDropdownProps> = ({ onChange }) => {
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineItem[]>(cuisines);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCuisineToggle = (cuisineName: string) => {
    const updatedCuisines = selectedCuisines.map(cuisine =>
      cuisine.name === cuisineName
        ? { ...cuisine, checked: !cuisine.checked }
        : cuisine
    );
    setSelectedCuisines(updatedCuisines);
    onChange?.(updatedCuisines.filter(c => c.checked).map(c => c.name));
  };

  // Function to handle deselecting from tooltip
  const handleTooltipDeselect = (cuisineName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the tooltip immediately
    handleCuisineToggle(cuisineName);
  };

  const handleMouseEnterButton = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setIsTooltipOpen(true);
  };

  const handleMouseLeaveButton = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 150); // Small delay to allow moving to tooltip
  };

  const handleMouseEnterTooltip = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  const handleMouseLeaveTooltip = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 150);
  };

  const handleSelectAll = (checked: boolean) => {
    const updatedCuisines = selectedCuisines.map(cuisine => ({
      ...cuisine,
      checked
    }));
    setSelectedCuisines(updatedCuisines);
    onChange?.(checked ? updatedCuisines.map(c => c.name) : []);
  };

  const allChecked = selectedCuisines.every(c => c.checked);
  const someChecked = selectedCuisines.some(c => c.checked) && !allChecked;
  const currentlySelected = selectedCuisines.filter(c => c.checked);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            className={`flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-full text-sm text-indigo-600 whitespace-nowrap transition-colors ${
              open ? "bg-indigo-100" : ""
            }`}
          >
            <GlobeAltIcon className="w-5 h-5 stroke-2" />
            <span className="font-medium">International Cuisines</span>
            <span className="text-xs text-indigo-500">
              ({currentlySelected.length})
            </span>
          </Popover.Button>

          {/* Tooltip */}
          {isTooltipOpen && !open && currentlySelected.length > 0 && (
            <div
              onMouseEnter={handleMouseEnterTooltip}
              onMouseLeave={handleMouseLeaveTooltip}
              className="absolute z-[9999] w-64 bg-white dark:bg-neutral-800 mt-2 rounded-xl shadow-xl border dark:border-neutral-700"
            >
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Selected Cuisines</div>
              <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent px-3 pb-2">
                {currentlySelected.map((cuisine) => (
                  <div key={cuisine.name} className="flex items-center justify-between py-1 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="flex items-center gap-2">
                       <Image src={`https://flagcdn.com/w20/${cuisine.flagCode}.png`} width={20} height={14} alt={`${cuisine.name} flag`} className="rounded-sm"/>
                      {cuisine.name}
                    </span>
                    <button
                      onClick={(e) => handleTooltipDeselect(cuisine.name, e)}
                      className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"
                      aria-label={`Deselect ${cuisine.name}`}
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
            show={open} // Control transition based on Popover's open state
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
                  {/* Select All Checkbox */}
                  <div className="flex items-center space-x-3 border-b pb-4">
                    <button
                      onClick={() => handleSelectAll(!allChecked)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        allChecked
                          ? "border-indigo-600 bg-indigo-600"
                          : someChecked
                          ? "border-indigo-600 bg-indigo-600/20"
                          : "border-neutral-300 dark:border-neutral-600"
                      }`}
                    >
                      {allChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      {someChecked && !allChecked && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      )}
                    </button>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      Select All Cuisines
                    </span>
                  </div>

                  {/* Three Column Grid with Scrollbar */}
                  <div className="overflow-y-auto max-h-[289px] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                      {selectedCuisines.map((cuisine) => (
                        <div
                          key={cuisine.name}
                          className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-7 rounded overflow-hidden shadow-sm">
                              <Image
                                src={`https://flagcdn.com/w40/${cuisine.flagCode}.png`}
                                alt={`${cuisine.name} flag`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {cuisine.name}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {cuisine.description}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleCuisineToggle(cuisine.name)}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              cuisine.checked
                                ? "border-indigo-600 bg-indigo-600"
                                : "border-neutral-300 dark:border-neutral-600 hover:border-indigo-400"
                            }`}
                          >
                            {cuisine.checked && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedCuisines(cuisines.map(c => ({ ...c, checked: false })));
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

export default InternationalCuisinesDropdown; 