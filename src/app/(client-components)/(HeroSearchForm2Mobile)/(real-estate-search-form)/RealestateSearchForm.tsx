"use client";

import React, { useState, useEffect } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import LocationInput from "../LocationInput";
import PriceRangeInput from "./PriceRangeInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import DistanceRangeInputs from "./DistanceRangeInputs";
import RestaurantTypeSelect from "./RestaurantTypeSelect";

interface CuisineType {
  name: string;
  description: string;
  checked: boolean;
  flag?: string;
}

const defaultCuisines: CuisineType[] = [
  {
    name: "All",
    description: "All International Cuisines",
    checked: true,
    flag: "all"
  },
  {
    name: "Italian",
    description: "Pizza, Pasta, and Mediterranean flavors",
    checked: true,
    flag: "it"
  },
  {
    name: "Indian",
    description: "Traditional Indian curries and tandoor",
    checked: true,
    flag: "in"
  },
  {
    name: "Chinese",
    description: "Regional Chinese specialties",
    checked: true,
    flag: "cn"
  },
  {
    name: "Japanese",
    description: "Sushi, Ramen, and Japanese dishes",
    checked: true,
    flag: "jp"
  }
];

const RealestateSearchForm = () => {
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "propertyType" | "distance"
  >("location");
  
  const [locationInputTo, setLocationInputTo] = useState("");
  const [rangeDistance, setRangeDistance] = useState([1000, 40000]);
  const [typeOfProperty, setTypeOfProperty] = useState<CuisineType[]>([]);
  const [cuisineSelectionText, setCuisineSelectionText] = useState("All Cuisines Selected");

  useEffect(() => {
    if (typeOfProperty && typeOfProperty.length > 0) {
      const checkedItems = typeOfProperty.filter((item) => item.checked);
      if (checkedItems.length === typeOfProperty.length && typeOfProperty.length > 0) {
        setCuisineSelectionText("All Cuisines Selected");
      } else if (checkedItems.length > 0) {
        const selectedText = checkedItems
          .filter((item) => item.name !== "All")
          .map((item) => item.name)
          .join(", ");
        setCuisineSelectionText(selectedText);
      } else {
        setCuisineSelectionText("Select cuisines");
      }
    }
  }, [typeOfProperty]);

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
              setFieldNameShow("propertyType");
            }}
          />
        )}
      </div>
    );
  };

  const renderInputPropertyType = () => {
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
            <span className="text-neutral-400">Cuisine</span>
            <span className="truncate ml-5">
              {cuisineSelectionText}
            </span>
          </button>
        ) : (
          <RestaurantTypeSelect
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

  return (
    <div>
      <div className="w-full space-y-5">
        {renderInputLocation()}
        {renderInputPropertyType()}
        {renderInputDistance()}
      </div>
    </div>
  );
};

export default RealestateSearchForm;
