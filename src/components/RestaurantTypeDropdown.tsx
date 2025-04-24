"use client";

import React, { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { BuildingStorefrontIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface RestaurantTypeItem {
  name: string;
  description: string;
  checked: boolean;
}

const restaurantTypes: RestaurantTypeItem[] = [
  {
    name: "All",
    description: "All types of restaurants",
    checked: true,
  },
  {
    name: "Family Restaurant",
    description: "Kid-friendly, casual with larger portions.",
    checked: true,
  },
  {
    name: "Fine Dining",
    description: "High-end, full-service with premium menu and elegant ambiance ideal for romantic dinners.",
    checked: true,
  },
  {
    name: "Casual Dining",
    description: "Sit-down service with moderate pricing and varied menu.",
    checked: true,
  },
  {
    name: "Fast Casual",
    description: "Higher quality than fast food, no table service.",
    checked: true,
  },
  {
    name: "Fast Food",
    description: "Quick service, often drive-thru or takeaway focused.",
    checked: true,
  },
  {
    name: "Café / Coffee Shop",
    description: "Light meals, coffee, pastries, relaxed setting.",
    checked: true,
  },
  {
    name: "Buffet",
    description: "All-you-can-eat or self-service restaurant.",
    checked: true,
  },
  {
    name: "Food Truck",
    description: "Mobile kitchen offering niche or gourmet street food.",
    checked: true,
  },
  {
    name: "Steakhouse",
    description: "Specializes in beef and grilled meats.",
    checked: true,
  },
  {
    name: "Seafood Restaurant",
    description: "Focuses on fish, oysters, and other seafood dishes.",
    checked: true,
  },
  {
    name: "Healthy / Vegan / Vegetarian",
    description: "Offers only plant-based or vegetarian meals.",
    checked: true,
  },
  {
    name: "Dessert Bar",
    description: "Focus on sweets — gelato, cakes, pancakes, etc.",
    checked: true,
  },
  {
    name: "Breakfast / Brunch",
    description: "Serves morning and mid-day meals.",
    checked: true,
  },
  {
    name: "Tapas / Small Plates",
    description: "Share-style small dishes.",
    checked: true,
  },
  {
    name: "Bar & Grill / Gastropub",
    description: "Upscale pub-style food with alcohol.",
    checked: true,
  },
  {
    name: "Take Away",
    description: "Takeout focused restaurant",
    checked: true,
  },
  {
    name: "Dinner & Drinks",
    description: "Evening dining with beverage service",
    checked: true,
  },
  {
    name: "Bars & Clubs",
    description: "Nightlife venues with food service",
    checked: true,
  }
];

interface RestaurantTypeDropdownProps {
  onChange?: (selectedTypes: string[]) => void;
}

const RestaurantTypeDropdown: React.FC<RestaurantTypeDropdownProps> = ({ onChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<RestaurantTypeItem[]>(restaurantTypes);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTypeToggle = (typeName: string) => {
    const updatedTypes = selectedTypes.map(type =>
      type.name === typeName
        ? { ...type, checked: !type.checked }
        : type
    );
    setSelectedTypes(updatedTypes);
    onChange?.(updatedTypes.filter(t => t.checked).map(t => t.name));
  };

  // Function to handle deselecting from tooltip
  const handleTooltipDeselect = (typeName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the tooltip immediately
    handleTypeToggle(typeName);
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
    const updatedTypes = selectedTypes.map(type => ({
      ...type,
      checked
    }));
    setSelectedTypes(updatedTypes);
    onChange?.(checked ? updatedTypes.map(t => t.name) : []);
  };

  const allChecked = selectedTypes.every(t => t.checked);
  const someChecked = selectedTypes.some(t => t.checked) && !allChecked;
  const currentlySelected = selectedTypes.filter(t => t.checked);

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
            <BuildingStorefrontIcon className="w-5 h-5 stroke-2" />
            <span className="font-medium">Restaurant Type</span>
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
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Selected Types</div>
              <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent px-3 pb-2">
                {currentlySelected.map((type) => (
                  <div key={type.name} className="flex items-center justify-between py-1 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="truncate" title={type.name}>{type.name}</span>
                    <button
                      onClick={(e) => handleTooltipDeselect(type.name, e)}
                      className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 flex-shrink-0 ml-1"
                      aria-label={`Deselect ${type.name}`}
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
                      Select All Types
                    </span>
                  </div>

                  {/* Three Column Grid with Scrollbar */}
                  <div className="overflow-y-auto max-h-[289px] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                      {selectedTypes.map((type) => (
                        <div
                          key={type.name}
                          className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-7 rounded overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-400 text-xs">
                              {/* Placeholder for image/icon if available */}
                              {type.name.substring(0, 2)}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {type.name}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {type.description}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleTypeToggle(type.name)}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              type.checked
                                ? "border-indigo-600 bg-indigo-600"
                                : "border-neutral-300 dark:border-neutral-600 hover:border-indigo-400"
                            }`}
                          >
                            {type.checked && (
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
                      setSelectedTypes(restaurantTypes.map(t => ({ ...t, checked: false })));
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

export default RestaurantTypeDropdown; 