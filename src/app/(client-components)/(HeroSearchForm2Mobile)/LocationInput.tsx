"use client";

import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef, FC } from "react";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
}

const LocationInput: FC<Props> = ({
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "What are you looking for?",
}) => {
  const [value, setValue] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Immediately notify parent of changes when value changes
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleSelectLocation = (item: string) => {
    setValue(item);
    onChange(item);
  };

  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string;
    items: string[];
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {items.map((item) => {
            return (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg px-2"
                onClick={() => handleSelectLocation(item)}
                key={item}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="flex-grow">{item}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pl-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={"Type a search term"}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 text-sm transition-all"
            onClick={() => onChange(value)}
          >
            Select
          </button>
        </div>
        <div className="mt-7">
          {value
            ? renderSearchValues({
                heading: "Search results",
                items: [
                  "Afghanistan",
                  "Albania",
                  "Algeria",
                  "American Samoa",
                  "Andorra",
                ],
              })
            : renderSearchValues({
                heading: "Recent Searches",
                items: [
                  "Australia",
                  "Canada",
                  "Germany",
                  "United Kingdom",
                  "United Arab Emirates",
                ],
              })}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
