"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlusIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  MapPinIcon,
  HeartIcon,
  FireIcon,
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";
import LocationSelector from "@/components/LocationSelector";
import CurrentLocationDisplay from "@/components/CurrentLocationDisplay";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({ className = "" }) => {
  const filterTags = [
    { name: 'International Cuisines', icon: GlobeAltIcon },
    { name: 'Favourite Dish', icon: HeartIcon },
    { name: 'Popular Foods', icon: FireIcon },
    { name: 'Restaurant name', icon: MagnifyingGlassIcon },
    { name: 'Restaurant Types', icon: BuildingStorefrontIcon },
    { name: 'Todays, Specials', icon: CurrencyDollarIcon },
  ];

  const handleLocationSelect = (location: any) => {
    console.log('Selected location:', location);
    // Handle the selected location
  };

  return (
    <div className={`nc-SectionHero relative pt-6 lg:pt-8 ${className}`}>
      {/* Background Image */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/restaurant7.png"
          alt="Restaurant ambiance"
          fill
          className="object-cover opacity-95"
          priority
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-12 text-center">What can I help with?</h1>
          
          {/* ChatGPT-style Search Bar */}
          <div className="w-full max-w-6xl mx-auto">
            {/* Current Location Display */}
            <div className="mb-4 flex justify-end">
              <CurrentLocationDisplay className="bg-white px-4 py-2 rounded-full shadow-sm" />
            </div>

            <div className="relative flex flex-col bg-white rounded-2xl shadow-lg">
              {/* Input and Icons Row */}
              <div className="flex items-center border-b border-neutral-200">
                <div className="flex items-center gap-2 pl-4">
                  <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                    <PlusIcon className="w-6 h-6 text-indigo-600 stroke-2" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Ask anything"
                  className="flex-1 px-4 py-4 text-lg border-none focus:ring-0 focus:outline-none"
                />

                <div className="flex items-center gap-3 pr-4">
                  <LocationSelector onSelect={handleLocationSelect} />
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-indigo-200 hover:border-indigo-300 rounded-lg text-sm text-neutral-600 whitespace-nowrap transition-all hover:bg-gray-50">
                    <span className="font-medium">1-10 Kms</span>
                    <svg className="w-4 h-4 ml-1 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                    <MicrophoneIcon className="w-6 h-6 text-indigo-600 stroke-2" />
                  </button>
                  <button className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors">
                    <MagnifyingGlassIcon className="w-6 h-6 text-white stroke-2" />
                  </button>
                </div>
              </div>

              {/* Filter Tags Row */}
              <div className="flex items-center justify-between px-3 py-2">
                {filterTags.map((tag) => (
                  <button
                    key={tag.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-full text-sm text-indigo-600 whitespace-nowrap transition-colors"
                  >
                    <tag.icon className="w-5 h-5 stroke-2" />
                    <span className="font-medium">{tag.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
