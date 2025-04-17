"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";

import RestaurantSearchForm from "./(real-estate-search-form)/RestaurantSearchForm";
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

export type SearchTab = "Dine In" | "Take Away" | "Child Friendly";

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
  const tabs: { id: SearchTab, icon: any, name: string, displayName?: string }[] = [
    {
      id: "Dine In",
      icon: MapPinIcon,
      name: "Dine In"
    },
    {
      id: "Take Away",
      icon: GlobeAsiaAustraliaIcon,
      name: "Take Away",
      displayName: "Take Away"
    },
    {
      id: "Child Friendly",
      icon: SparklesIcon,
      name: "Child Friendly",
      displayName: "Child Friendly"
    },


  ];

  // const [tabActive, setTabActive] = useState<SearchTab>(currentTab); 
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(defaultPropertyTypes || []);
  const [modalOpen, setModalOpen] = useState(false);



  const handlePropertyTypeChange = (selectedTypes: string[]) => {
    setSelectedPropertyTypes(selectedTypes);
  };

  const renderTab = () => {
    return (
      <div className="flex flex-col items-center w-full space-y-4">
        {/* First row - original 6 tabs */}
        <ul className="flex flex-wrap justify-center items-center gap-2  w-full">
          {tabs.slice(0, 10).map((tab) => {
            // const active = tab.id === tabActive;
            const Icon = tab.icon;
            return (
              <li
                // onClick={() => setTabActive(tab.id)}
                className={`flex-shrink-0 cursor-pointer group `}
                key={tab.id}
              >


                <Checkbox
                  className="text-sm font-medium text-center whitespace-pre-line text-white"
                  defaultChecked={true}
                  label={tab.displayName || tab.name}
                  name={tab.id}
                />


              </li>

            );
          })}

          <div className="w-300 text-white flex items-center justify-center gap-2" >
            {/* <ButtonSecondary className="flex items-center justify-center gap-1.5 py-0.5 px-1.5 text-sm rounded-full ">
              <Bars3Icon className="w-5 h-5 text-primary-500" />
              Show All Filters
            </ButtonSecondary> */}
            <TabFilters page="header" className="flex items-center justify-center gap-1.5 py-0.5 px-1.5 text-sm rounded-full " />
          </div>
        </ul>
        {/* Second row - new tabs */}
        {/* <ul className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {tabs.slice(6).map((tab) => {
            const active = tab.id === tabActive;
            const Icon = tab.icon;
            return (
              <li
                onClick={() => setTabActive(tab.id)}
                className={`flex-shrink-0 cursor-pointer group ${
                  active ? "cursor-default" : ""
                }`}
                key={tab.id}
              >
                <div className={`flex flex-col items-center justify-center p-4 h-[100px] w-[100px] rounded-2xl transition-all duration-200 ${
                  active 
                    ? "bg-primary-6000 text-white shadow-lg transform scale-105"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}>
                  <Icon className={`w-6 h-6 mb-2 ${
                    active ? "text-white" : "text-neutral-600 dark:text-neutral-400"
                  }`} />
                  <span className="text-sm font-medium text-center whitespace-pre-line">
                    {tab.displayName || tab.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul> */}
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="relative mt-8">
        <RestaurantSearchForm
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
      className={`nc-RRSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      id="search-form"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default RRSearchForm;
