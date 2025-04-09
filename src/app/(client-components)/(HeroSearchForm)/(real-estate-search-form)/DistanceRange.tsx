"use client";

import React, { Fragment, useState, FC, useContext, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import Slider from "rc-slider";
import { MapIcon } from "@heroicons/react/24/outline";
import { PathName } from "@/routers/types";

export interface DistanceRangeProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
  activeTab?: string;
  onDistanceChange?: (distanceRange: string) => void;
}

const DistanceRange: FC<DistanceRangeProps> = ({
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  activeTab = "Near Me",
  onDistanceChange,
}) => {
  const [rangeDistance, setRangeDistance] = useState([0, 10]); // Default range 0-10 km

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
            className={`flex-1 z-10 flex items-center focus:outline-none cursor-pointer ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`flex-1 flex text-left items-center focus:outline-none ${fieldClassName} space-x-3 `}
              onClickCapture={() => document.querySelector("html")?.click()}
            >
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
            <Popover.Panel className="absolute left-0 lg:right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <div className="relative flex flex-col space-y-8">
                <div className="space-y-5">
                  <span className="font-medium">Distance Range</span>
                  <Slider
                    range
                    className="text-blue-600"
                    min={0}
                    max={50} // Maximum 50 km
                    defaultValue={[rangeDistance[0], rangeDistance[1]]}
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
