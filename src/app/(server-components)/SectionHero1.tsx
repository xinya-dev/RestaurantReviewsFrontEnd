"use client";

import React, { useState, Fragment } from "react";
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
  CurrencyDollarIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import LocationSelector from "@/components/LocationSelector";
import CurrentLocationDisplay from "@/components/CurrentLocationDisplay";
import DistanceSelector from "@/components/DistanceSelector";
import Checkbox from "@/shared/Checkbox";
import InternationalCuisinesDropdown from "@/components/InternationalCuisinesDropdown";
import FavouriteDishDropdown from "@/components/FavouriteDishDropdown";
import PopularFoodsDropdown from "@/components/PopularFoodsDropdown";
import TodaysSpecialsDropdown from "@/components/TodaysSpecialsDropdown";
import RestaurantTypeDropdown from '@/components/RestaurantTypeDropdown';
import RestaurantNameDropdown from '@/components/RestaurantNameDropdown';

export interface SectionHeroProps {
  className?: string;
}

// Filter data
const filterTags = [
  { name: 'International Cuisines', icon: GlobeAltIcon, defaultChecked: true },
  { name: 'Favourite Dish', icon: HeartIcon, defaultChecked: true },
  { name: 'Popular Foods', icon: FireIcon },
  { name: 'Restaurant name', icon: MagnifyingGlassIcon },
  { name: 'Restaurant Types', icon: BuildingStorefrontIcon },
  { name: 'Todays, Specials', icon: CurrencyDollarIcon },
];

const moreFilter1 = [
  { name: "Italian", defaultChecked: true },
  { name: "Chinese", defaultChecked: true },
  { name: "Indian" },
  { name: "Japanese" },
  { name: "Mexican" },
  { name: "Thai" },
  { name: "Mediterranean" },
  { name: "American" },
  { name: "French" },
  { name: "Korean" },
];

const moreFilter2 = [
  { name: "Vegetarian" },
  { name: "Vegan" },
  { name: "Gluten-Free" },
  { name: "Halal" },
  { name: "Kosher" },
];

const moreFilter3 = [
  { name: "Fine Dining" },
  { name: "Casual Dining" },
  { name: "Fast Food" },
  { name: "Cafe" },
  { name: "Bistro" },
  { name: "Buffet" },
  { name: "Food Truck" },
  { name: "Pub" },
  { name: "Bar" },
  { name: "Diner" },
];

const SectionHero: React.FC<SectionHeroProps> = ({ className = "" }) => {
  const [isOpenMoreFilter, setIsOpenMoreFilter] = useState(false);

  const closeModalMoreFilter = () => setIsOpenMoreFilter(false);
  const openModalMoreFilter = () => setIsOpenMoreFilter(true);

  const renderMoreFilterItem = (
    data: {
      name: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              className="text-primary-500"
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              className="text-primary-500"
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleLocationSelect = (location: any) => {
    console.log('Selected location:', location);
    // Handle the selected location
  };

  const handleDistanceChange = (distanceRange: string) => {
    console.log('Selected distance range:', distanceRange);
    // Handle the distance range change
  };

  const handleCuisineChange = (selectedCuisines: string[]) => {
    console.log('Selected cuisines:', selectedCuisines);
    // Handle the selected cuisines
  };

  const handleFavouriteDishChange = (selectedDishes: string[]) => {
    console.log('Selected dishes:', selectedDishes);
    // Handle the selected dishes
  };

  const handlePopularFoodsChange = (selectedFoods: string[]) => {
    console.log('Selected foods:', selectedFoods);
    // Handle the selected foods
  };

  const handleTodaysSpecialsChange = (selectedSpecials: string[]) => {
    console.log('Selected specials:', selectedSpecials);
    // Handle the selected specials
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
          <div className="w-full max-w-8xl mx-auto">
            {/* Current Location Display */}
            <div className="mb-4 flex justify-end">
              <CurrentLocationDisplay className="bg-white px-4 py-2 rounded-full shadow-sm" />
            </div>

            <div className="relative flex flex-col bg-white rounded-2xl shadow-lg">
              {/* Input and Icons Row */}
              <div className="flex items-center border-b border-neutral-200">
                <div className="flex items-center gap-2 pl-4">
                  <button 
                    onClick={openModalMoreFilter}
                    className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
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
                  <DistanceSelector 
                    onChange={handleDistanceChange}
                    defaultDistance="1-10"
                  />
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
                <InternationalCuisinesDropdown onChange={handleCuisineChange} />
                <FavouriteDishDropdown onChange={handleFavouriteDishChange} />
                <PopularFoodsDropdown onChange={handlePopularFoodsChange} />
                <RestaurantNameDropdown onChange={(restaurants) => {
                  console.log('Selected restaurants:', restaurants);
                  // Handle restaurant selection
                }} />
                <TodaysSpecialsDropdown onChange={handleTodaysSpecialsChange} />
                <RestaurantTypeDropdown onChange={(selectedTypes) => {
                  console.log('Selected types:', selectedTypes);
                  // Handle selected types
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <Transition appear show={isOpenMoreFilter} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalMoreFilter}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    More filters
                  </Dialog.Title>
                  <button
                    onClick={closeModalMoreFilter}
                    className="absolute left-3 top-3 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto">
                  <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                    <div className="py-7">
                      <h3 className="text-xl font-medium">Cuisines</h3>
                      <div className="mt-6 relative text-primary-500">
                        {renderMoreFilterItem(moreFilter1)}
                      </div>
                    </div>
                    <div className="py-7">
                      <h3 className="text-xl font-medium">Dietary Preferences</h3>
                      <div className="mt-6 relative">
                        {renderMoreFilterItem(moreFilter2)}
                      </div>
                    </div>
                    <div className="py-7">
                      <h3 className="text-xl font-medium">Restaurant Types</h3>
                      <div className="mt-6 relative">
                        {renderMoreFilterItem(moreFilter3)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={closeModalMoreFilter}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                  >
                    Clear
                  </button>
                  <button
                    onClick={closeModalMoreFilter}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SectionHero;
