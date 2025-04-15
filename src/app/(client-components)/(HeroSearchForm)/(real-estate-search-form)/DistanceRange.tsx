"use client";

import React, { Fragment, useState, FC, useContext, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import Slider from "rc-slider";
import { MapIcon } from "@heroicons/react/24/outline";
import { PathName } from "@/routers/types";
import { useSearchParams } from "next/navigation";

export interface DistanceRangeProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
  activeTab?: string;
  onDistanceChange?: (distanceRange: string) => void;
  defaultSearchDistance?: string;
}

const DistanceRange: FC<DistanceRangeProps> = ({
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  activeTab = "Near Me",
  onDistanceChange,
  defaultSearchDistance,
}) => {
  const popoverButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  }>({ vertical: 'bottom', horizontal: 'left' });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  // Listen for the custom dropdown event
  useEffect(() => {
    const handleOpenSearchDropdown = (event: Event) => {
      // Check if the event is our custom event and type is 'distance'
      if (event instanceof CustomEvent && 
          event.detail && 
          event.detail.type === 'distance' && 
          popoverButtonRef.current) {
        // Click the button to open the dropdown
        popoverButtonRef.current.click();
      }
    };
    
    // Add event listener
    window.addEventListener('openSearchDropdown', handleOpenSearchDropdown);
    
    // Clean up
    return () => {
      window.removeEventListener('openSearchDropdown', handleOpenSearchDropdown);
    };
  }, []);

  // Update effect to check both vertical and horizontal positioning
  useEffect(() => {
    const updatePosition = () => {
      if (popoverButtonRef.current) {
        const buttonRect = popoverButtonRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const dropdownHeight = 240; // Height of the dropdown
        const dropdownWidth = 340; // Min width of the dropdown
        
        // Check vertical position
        const spaceBelow = windowHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        
        // Check horizontal position
        const spaceRight = windowWidth - buttonRect.right;
        const spaceLeft = buttonRect.left;

        setDropdownPosition({
          vertical: spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'top' : 'bottom',
          horizontal: spaceRight < dropdownWidth && spaceLeft > spaceRight ? 'left' : 'right'
        });
      }
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  // Parse the defaultSearchDistance if it exists, otherwise use default range
  const initialRangeDistance = React.useMemo(() => {
    if (defaultSearchDistance) {
      const parts = defaultSearchDistance.split('-');
      if (parts.length === 2) {
        const min = parseInt(parts[0], 10);
        const max = parseInt(parts[1], 10);
        // Validate the values are numbers and within range
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max <= 50 && min <= max) {
          return [min, max];
        }
      }
    }
    return [0, 10]; // Default range 0-10 km
  }, [defaultSearchDistance]);

  const [rangeDistance, setRangeDistance] = useState(initialRangeDistance);

  // Update the rangeDistance when defaultSearchDistance changes
  useEffect(() => {
    if (defaultSearchDistance) {
      const parts = defaultSearchDistance.split('-');
      if (parts.length === 2) {
        const min = parseInt(parts[0], 10);
        const max = parseInt(parts[1], 10);
        // Validate the values are numbers and within range
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max <= 50 && min <= max) {
          setRangeDistance([min, max]);
        }
      }
    }
  }, [defaultSearchDistance]);

  const formatDistance = (distance: number) => {
    return distance === 0 ? "0" : `${distance}`;
  };

  // Get search query from parent element or context if available
  const getSearchParams = () => {
    // Create search parameters
    return {
      category: activeTab,
      distance: `${rangeDistance[0]}-${rangeDistance[1]}`,
    };
  };

  // Notify parent component when distance range changes
  useEffect(() => {
    onDistanceChange?.(`${rangeDistance[0]}-${rangeDistance[1]}`);
  }, [rangeDistance, onDistanceChange]);

  // Handle form submission
  const handleFormSubmit = (e: React.MouseEvent) => {
    // Let the parent form handle the submission
    const form = (e.target as HTMLElement).closest('form');
    if (form) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <Popover className="flex relative flex-[1.3]">
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none cursor-pointer group ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              ref={popoverButtonRef}
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              onClick={() => setIsTooltipVisible(false)}
              className={`flex-1 flex text-left items-center focus:outline-none ${fieldClassName} space-x-3 `}
            >
              {/* Tooltip */}
              <div
                className={`absolute transition-opacity bottom-full left-0 mb-2 px-4 py-2 bg-white dark:bg-neutral-800 text-sm rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 whitespace-nowrap ${
                  isTooltipVisible ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
              >
                <div className="font-medium text-neutral-900 dark:text-neutral-100">Set search radius</div>
                <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">Find restaurants within your preferred distance</div>
                {/* Arrow */}
                <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700"></div>
              </div>

              <div className="text-neutral-300 dark:text-neutral-400">
                <MapIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold truncate">
                  {`${formatDistance(rangeDistance[0])} - ${formatDistance(rangeDistance[1])} km`}
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  Distance range
                </span>
              </div>
            </Popover.Button>
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-1 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel 
              className={`absolute z-50 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 
                ${dropdownPosition.vertical === 'top' 
                  ? 'bottom-[calc(100%+1.5rem)]' 
                  : 'top-[calc(100%+1.5rem)]'}
                ${dropdownPosition.horizontal === 'left'
                  ? 'left-0'
                  : 'right-0'}
                py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl h-[240px]`}
            >
              <div className="relative flex flex-col space-y-8">
                <div className="">
                  <span className="font-medium">Distance Range</span>
                  <Slider
                    range
                    className="text-blue-600"
                    min={0}
                    max={50} // Maximum 50 km
                    value={rangeDistance}
                    allowCross={false}
                    step={0.5} // Half kilometer steps
                    onChange={(e) => setRangeDistance(e as number[])}
                  />
                </div>

                <div className="flex justify-between space-x-3">
                  <div>
                    <label
                      htmlFor="minDistance"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Min distance
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-neutral-500 sm:text-sm"></span>
                      </div>
                      <input
                        type="text"
                        disabled
                        name="minDistance"
                        id="minDistance"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-500 rounded-full text-neutral-900 dark:text-neutral-200 bg-transparent"
                        value={`${formatDistance(rangeDistance[0])} km`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="maxDistance"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Max distance
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-neutral-500 sm:text-sm"></span>
                      </div>
                      <input
                        disabled
                        type="text"
                        name="maxDistance"
                        id="maxDistance"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-500 rounded-full text-neutral-900 dark:text-neutral-200 bg-transparent"
                        value={`${formatDistance(rangeDistance[1])} km`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none"
                    onClick={(e) => {
                      close();
                      handleFormSubmit(e);
                    }}
                  >
                    Apply Distance
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

export default DistanceRange;
