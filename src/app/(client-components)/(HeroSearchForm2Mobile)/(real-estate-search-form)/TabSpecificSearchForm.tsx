"use client";

import React, { useState, useEffect } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import LocationInput from "../LocationInput";
import DistanceRangeInputs from "./DistanceRangeInputs";
import RestaurantTypeSelect from "./RestaurantTypeSelect";
import ButtonSubmit from "../ButtonSubmit";

interface CuisineType {
  name: string;
  description: string;
  checked: boolean;
  flag?: string;
}

interface FastFoodType {
  name: string;
  description: string;
  checked: boolean;
}

interface FavouriteFoodType {
  name: string;
  description: string;
  checked: boolean;
}

const fastFoodTypes: FastFoodType[] = [
  {
    name: "All",
    description: "All Fast Food Types",
    checked: true,
  },
  {
    name: "Burgers",
    description: "Classic and gourmet burgers",
    checked: true,
  },
  {
    name: "Pizza",
    description: "Quick-serve pizza options",
    checked: true,
  },
  {
    name: "Sandwiches",
    description: "Fresh and toasted sandwiches",
    checked: true,
  },
  {
    name: "Chicken",
    description: "Fried and grilled chicken",
    checked: true,
  },
  {
    name: "Hot Dogs",
    description: "Classic and gourmet hot dogs",
    checked: true,
  },
  {
    name: "Tacos",
    description: "Quick-serve Mexican favorites",
    checked: true,
  },
  {
    name: "Fish & Chips",
    description: "Classic fish and chips",
    checked: true,
  }
];

const favouriteFoodTypes: FavouriteFoodType[] = [
  {
    name: "All",
    description: "All Favourite Categories",
    checked: true,
  },
  {
    name: "Most Reviewed",
    description: "Highly rated by our community",
    checked: true,
  },
  {
    name: "Top Rated",
    description: "Best rated restaurants",
    checked: true,
  },
  {
    name: "Popular Now",
    description: "Trending in your area",
    checked: true,
  },
  {
    name: "Recently Added",
    description: "New additions to our platform",
    checked: true,
  },
  {
    name: "Editor's Choice",
    description: "Handpicked by our food experts",
    checked: true,
  }
];

interface TabSpecificSearchFormProps {
  activeTab: string;
  onChange?: (params: Record<string, string>) => void;
}

const TabSpecificSearchForm: React.FC<TabSpecificSearchFormProps> = ({ 
  activeTab,
  onChange
}) => {
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "propertyType" | "distance"
  >("location");
  
  const [locationInputTo, setLocationInputTo] = useState("");
  const [rangeDistance, setRangeDistance] = useState([0, 15000]);
  const [typeOfProperty, setTypeOfProperty] = useState<any[]>([]);
  const [selectionText, setSelectionText] = useState("All Selected");

  // Set initial selection text based on active tab
  useEffect(() => {
    if (activeTab === "Fast Food") {
      setSelectionText("All Fast Food Types");
    } else if (activeTab === "Favorite Foods") {
      setSelectionText("All Favourite Categories");
    } else {
      setSelectionText("All Cuisines Selected");
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeOfProperty && typeOfProperty.length > 0) {
      const checkedItems = typeOfProperty.filter((item) => item.checked);
      if (checkedItems.length === typeOfProperty.length && typeOfProperty.length > 0) {
        if (activeTab === "Fast Food") {
          setSelectionText("All Fast Food Types");
        } else if (activeTab === "Favorite Foods") {
          setSelectionText("All Favourite Categories");
        } else {
          setSelectionText("All Cuisines Selected");
        }
      } else if (checkedItems.length > 0) {
        const selectedText = checkedItems
          .filter((item) => item.name !== "All")
          .map((item) => item.name)
          .join(", ");
        setSelectionText(selectedText);
      } else {
        if (activeTab === "Fast Food") {
          setSelectionText("Select fast food types");
        } else if (activeTab === "Favorite Foods") {
          setSelectionText("Select favourite foods");
        } else {
          setSelectionText("Select cuisines");
        }
      }
    }
  }, [typeOfProperty, activeTab]);

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Type & Search</span>
            <span>{locationInputTo || "What you are looking for?"}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInputTo}
            onChange={(value) => {
              setLocationInputTo(value);
            }}
          />
        )}
      </div>
    );
  };

  const renderInputPropertyType = () => {
    // Hide cuisine selection for any tab except the three specified
    if (activeTab !== "International Cuisines" && 
        activeTab !== "Fast Food" && 
        activeTab !== "Favorite Foods") {
      return null;
    }

    const isActive = fieldNameShow === "propertyType";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("propertyType")}
          >
            <span className="text-neutral-400">
              {activeTab === "Fast Food" ? "Fast Food" : 
               activeTab === "Favorite Foods" ? "Favourite Categories" :
               "Cuisine"}
            </span>
            <span className="truncate ml-5">
              {selectionText}
            </span>
          </button>
        ) : (
          <RestaurantTypeSelect
            activeTab={activeTab}
            onChange={setTypeOfProperty}
          />
        )}
      </div>
    );
  };

  const renderInputDistance = () => {
    const isActive = fieldNameShow === "distance";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("distance")}
          >
            <span className="text-neutral-400">Distance</span>
            <span className="truncate ml-5">{`${convertNumbThousand(
              rangeDistance[0] / 1000
            )}km - ${convertNumbThousand(rangeDistance[1] / 1000)}km`}</span>
          </button>
        ) : (
          <DistanceRangeInputs
            defaultValue={rangeDistance}
            onChange={(data) => {
              setRangeDistance(data);
            }}
          />
        )}
      </div>
    );
  };

  // Create a search params object with all the form data
  const getSearchParams = () => {
    // Convert the selected categories to a comma-separated string
    let selectedCategories = "";
    if (typeOfProperty && typeOfProperty.length > 0) {
      const checkedItems = typeOfProperty.filter(item => item.checked);
      if (checkedItems.length > 0 && checkedItems.length < typeOfProperty.length) {
        selectedCategories = checkedItems
          .filter(item => item.name !== "All")
          .map(item => item.name)
          .join(",");
      }
    }

    // Convert distance range to a string
    const distanceRange = `${rangeDistance[0]}-${rangeDistance[1]}`;

    const params: Record<string, string> = {
      query: locationInputTo,
      category: activeTab,
      distance: distanceRange,
    };
    
    // Only add filters if they exist
    if (selectedCategories) {
      params.filters = selectedCategories;
    }

    return params;
  };

  // Update parent component whenever search parameters change
  useEffect(() => {
    const params = getSearchParams();
    onChange?.(params);
  }, [locationInputTo, rangeDistance, typeOfProperty, activeTab, onChange]);

  return (
    <div>
      <div className="w-full space-y-5">
        {renderInputLocation()}
        {renderInputPropertyType()}
        {renderInputDistance()}
        
        <div className="pt-3 pb-1">
          <ButtonSubmit 
            className="w-full"
            searchParams={getSearchParams()}
          />
        </div>
      </div>
    </div>
  );
};

export default TabSpecificSearchForm; 