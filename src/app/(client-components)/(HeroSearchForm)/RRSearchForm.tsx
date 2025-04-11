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
  StarIcon
} from "@heroicons/react/24/outline";

export type SearchTab = "Near Me" | "International Cuisine" | "Restaurant Type" | "Favourite Foods" | "Todays Specials" | "Fast Food" | "Child Friendly" | "Healthy Foods" | "Cafés & Coffee" | "Fine Dining" | "Casual Dining";

export interface RRSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: SearchTab;
  defaultSearchText?: string;
  defaultSearchDistance?: string;
  defaultSelectedItems?: string[];
  tabClassName?: string;
}

const RRSearchForm: FC<RRSearchFormProps> = ({
  className = "",
  currentTab = "Near Me",
  currentPage,
  defaultSearchText,
  defaultSearchDistance,
  defaultSelectedItems,
  tabClassName = "p-4 h-[100px] w-[95px]"
}) => {
  const tabs: {id: SearchTab, icon: any, name: string, displayName?: string}[] = [
    {
      id: "Near Me",
      icon: MapPinIcon,
      name: "Near Me"
    },
    {
      id: "International Cuisine",
      icon: GlobeAsiaAustraliaIcon,
      name: "International Cuisine",
      displayName: "International\nCuisines"
    },
    {
      id: "Restaurant Type",
      icon: SparklesIcon,
      name: "Restaurant Type",
      displayName: "Restaurant\nType"
    },
   
    {
      id: "Favourite Foods",
      icon: HeartIcon,
      name: "Favourite Foods",
      displayName: "Favourite\nFoods"
    },
   
    {
      id: "Todays Specials",
      icon: StarIcon,
      name: "Todays Specials",
      displayName: "Todays\nSpecials"
    }
  ];
  
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <div className="flex flex-col items-center w-full space-y-4">
        {/* First row - original 6 tabs */}
        <ul className="flex flex-wrap justify-center gap-2 lg:gap-3 w-full">
          {tabs.slice(0, 10).map((tab) => {
            const active = tab.id === tabActive;
            const Icon = tab.icon;
            return (
              <li
                onClick={() => setTabActive(tab.id)}
                className={`flex-shrink-0 cursor-pointer group ${active ? "cursor-default" : ""}`}
                key={tab.id}
              >
                <div className={`flex flex-col items-center justify-center rounded-2xl transition-all duration-200 ${tabClassName} ${
                  active 
                    ? "bg-primary-6000 text-white shadow-lg transform scale-105"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}>
                  <Icon className={`w-6 h-6 mb-2 ${active ? "text-white" : "text-neutral-600 dark:text-neutral-400"}`} />
                  <span className="text-sm font-medium text-center whitespace-pre-line">
                    {tab.displayName || tab.name}
                  </span>
                </div>
              </li>
            );
          })}
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
    return <RestaurantSearchForm activeTab={tabActive} defaultSearchText={defaultSearchText} defaultSearchDistance={defaultSearchDistance} defaultSelectedItems={defaultSelectedItems} />;
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
