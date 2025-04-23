"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";

import RestaurantSearchForm1 from "./(real-estate-search-form)/RestaurantSearchForm";
import {
  MapPinIcon,
  GlobeAsiaAustraliaIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  BoltIcon,
  FaceSmileIcon,
  HeartIcon,
  FireIcon,
  
  CakeIcon,
  StarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";
import Checkbox from "@/shared/Checkbox";
import Button from "@/shared/Button";
import ButtonSecondary from "@/shared/ButtonSecondary";
import TabFilters from "@/app/(stay-listings)/TabFilters";
import RestaurantCategories from "@/components/RestaurantCategories";
export type SearchTab = "Dine In" | "Take Away" | "Child Friendly";
import { IoMdSearch } from "react-icons/io";
import { MdStorefront } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import GuestInput from "./GuestsInput";     
import Input from "@/shared/Input";
export interface RRSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: SearchTab;
  defaultSearchText?: string;
  defaultSearchDistance?: string;
  defaultSelectedItems?: string[];
  defaultPropertyTypes?: string[];
  tabClassName?: string;
}

const RRSearchForm: FC<RRSearchFormProps> = ({
  className = "",
  currentTab = "Near Me",
  currentPage,
  defaultSearchText,
  defaultSearchDistance,
  defaultSelectedItems,
  defaultPropertyTypes,
  tabClassName = "p-4 h-[100px] w-[95px]"
}) => {
  const tabs: { id: any, icon: any, name: string, displayName?: string }[] = [
    { id: 1, name: "Select town", icon: MapPinIcon },
    { id: 2, name: "International Cuisines", icon: GlobeAsiaAustraliaIcon },
    { id: 3, name: "Favourite Dish", icon: HeartIcon },
    { id: 4, name: "Popular Foods", icon: FireIcon },
    { id: 5, name: "Restaurant name", icon: IoMdSearch },
    { id: 6, name: "Restaurant Types", icon: MdStorefront },
    { id: 7, name: "Todays, Specials", icon: BsCurrencyDollar }

  ];

  // const [tabActive, setTabActive] = useState<SearchTab>(currentTab); 
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(defaultPropertyTypes || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [searchText, setSearchText] = useState(defaultSearchText || "");



  const handlePropertyTypeChange = (selectedTypes: string[]) => {
    setSelectedPropertyTypes(selectedTypes);
  };

  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };

  const renderTab = () => {
    return (
      <div className="flex flex-col items-center w-full">
        <ul className="flex justify-between items-center w-full px-2">
          {tabs.map((tab) => {
            const isSelected = tab.id === selectedTab;
            return (
              <li
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-shrink-0 cursor-pointer group transition-all duration-200 items-center justify-center ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
                key={tab.id}
              >
                <RestaurantCategories
                  taxonomy={{
                    id: tab.id,
                    name: tab.name,
                    icon: <tab.icon className={`w-12 h-12 p-2 mr-1 bg-indigo-100 text-white rounded-full transition-all duration-700 ease-in-out ${
                      isSelected 
                        ? 'text-indigo-600' 
                        : 'text-indigo-600'
                    }`} />
                  }}
                  isSelected={isSelected}
                  className={`w-[155px] h-[80px] rounded-2xl transition-all duration-700 ease-in-out ${
                    isSelected 
                      ? 'bg-indigo-600 shadow-lg' 
                      : 'bg-white hover:bg-indigo-50'
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const renderInputLocation = () => {
    return (
      <div className="flex justify-center items-center">
       <Input
       placeholder="Start typing to search"
      //  icon={<MapPinIcon className="w-5 h-5" />}
          // initialValue={searchText}
          // onChange={handleSearchTextChange}
          className="flex-1 bg-white w-[550px] h-[50px] rounded-full m-5 p-5 border-none"
        />
      </div>
    );
  };
  const renderForm = () => {
    return (
      <div className="relative mt-8">
        <RestaurantSearchForm1
          // activeTab={tabActive} 
          defaultSearchText={defaultSearchText}
          defaultSearchDistance={defaultSearchDistance}
          defaultSelectedItems={defaultSelectedItems}
          defaultPropertyTypes={selectedPropertyTypes}
          onPropertyTypeChange={handlePropertyTypeChange}
        />
      </div>
    );
                };

  return (
    <div
      className={`nc-RRSearchForm w-full max-w-6xl py-5 lg:py-0 ${className} flex flex-col justify-between items-center`}
      id="search-form"
    >
      <div className="flex flex-[2] lg:flex-row flex-col items-center justify-center bg-white rounded-full w-[600px] h-[70px]">
      {renderInputLocation()}
      </div>
      <div className="flex flex-[2] lg:flex-row flex-col items-center justify-center">
      <span className="block mb-4 text-lg md:text-xl text-white dark:text-neutral-300">
              Or have a more precise search

              </span>
      </div>
      {renderTab()}
      {renderForm()}
      
    </div>
  );
};

export default RRSearchForm;
