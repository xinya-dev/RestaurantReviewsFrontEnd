"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import {
  MapPinIcon,
  GlobeAsiaAustraliaIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  BoltIcon,
  FaceSmileIcon
} from "@heroicons/react/24/outline";

export type SearchTab = "Near Me" | "International Cuisine" | "Fine Dine" | "Casual Dining" | "Fast Food" | "Child Friendly";

export interface RRSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: SearchTab;
}

const RRSearchForm: FC<RRSearchFormProps> = ({
  className = "",
  currentTab = "Near Me",
  currentPage,
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
      displayName: "International\nCuisine"
    },
    {
      id: "Fine Dine",
      icon: SparklesIcon,
      name: "Fine Dine"
    },
    {
      id: "Casual Dining",
      icon: BuildingStorefrontIcon,
      name: "Casual Dining",
      displayName: "Casual\nDining"
    },
    {
      id: "Fast Food",
      icon: BoltIcon,
      name: "Fast Food"
    },
    {
      id: "Child Friendly",
      icon: FaceSmileIcon,
      name: "Child Friendly",
      displayName: "Child\nFriendly"
    }
  ];
  
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <div className="flex justify-center w-full">
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {tabs.map((tab) => {
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
                <div className={`flex flex-col items-center justify-center p-4 min-h-[100px] min-w-[100px] rounded-2xl transition-all duration-200 ${
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
        </ul>
      </div>
    );
  };

  const renderForm = () => {
    // For now, we'll use the StaySearchForm for all tabs
    // Later we can create specific forms for each restaurant category
    return <StaySearchForm />;
  };

  return (
    <div
      className={`nc-RRSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default RRSearchForm;
