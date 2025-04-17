import React, { FC, useState, FormEvent, useRef, useEffect, useCallback } from "react";
import RRSearchBox from "../RRSearchBox";
import { SearchTab } from "../RRSearchForm";
import { useRouter } from "next/navigation";
import ButtonSubmit from "../ButtonSubmit";
import RestaurantType from "./RestaurantType";
import DistanceRange from "./DistanceRange";
import PropertyTypeSelect from "./PropertyTypeSelect";

interface RestaurantSearchFormProps {
  className?: string;
  activeTab?: SearchTab;
  defaultSearchText?: string;
  defaultSearchDistance?: string;
  defaultSelectedItems?: string[];
  defaultPropertyTypes?: string[];
  onPropertyTypeChange?: (selectedTypes: string[]) => void;
}

const RestaurantSearchForm: FC<RestaurantSearchFormProps> = ({
  className = "",
  activeTab = "Near Me",
  defaultSearchText = "",
  defaultSearchDistance = "",
  defaultSelectedItems = [],
  defaultPropertyTypes = [],
  onPropertyTypeChange
}) => {
  const [searchText, setSearchText] = useState(defaultSearchText);
  const [searchDistance, setSearchDistance] = useState(defaultSearchDistance);
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultSelectedItems);
  const router = useRouter();
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  console.log("RestaurantSearchForm", defaultSearchText, defaultSearchDistance, defaultSelectedItems);
  
  const showRestaurantType = activeTab === "International Cuisine" || 
                            activeTab === "Fast Food" || 
                            activeTab === "Favourite Foods";

  // Direct handler for search text coming from SearchBox
  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Add category
    if (activeTab) {
      params.append('category', activeTab);
    }

    // Add search query
    if (searchText) {
      params.append('query', searchText);
    }

    // Add distance range
    if (searchDistance) {
      params.append('distance', searchDistance);
    }

    // Add cuisine filters
    if (selectedItems && selectedItems.length > 0) {
      params.append('filters', selectedItems.join(','));
    }

    // Add property types
    if (defaultPropertyTypes && defaultPropertyTypes.length > 0) {
      params.append('propertyTypes', defaultPropertyTypes.join(','));
    }

    // Navigate to the search results page with all parameters
    const searchUrl = `/listing-stay-map?${params.toString()}`;
    router.push(searchUrl as any);
  };

  // Handle distance change
  const handleDistanceChange = (value: string) => {
    setSearchDistance(value);
  };

  // Handle selection change from RestaurantType - now with useCallback
  const handleSelectionChange = useCallback((items: string[]) => {
    setSelectedItems(items);
  }, []); // Empty dependency array means this function will maintain the same reference

  // When active tab changes, log the state once
  // Using a ref to prevent this effect from running on every render
  const previousTabRef = useRef(activeTab);
  
  useEffect(() => {
    // Only log when the tab actually changes, not on every render
    if (previousTabRef.current !== activeTab) {
      // Update params when tab changes
      console.log("Form state after tab change:", {
        category: activeTab,
        query: searchText,
        distance: searchDistance,
        filters: selectedItems.join(',')
      });
      
      // Update the ref to current tab
      previousTabRef.current = activeTab;
    }
  }, [activeTab, searchText, searchDistance, selectedItems]);

  const handlePropertyTypeSelect = (selectedTypes: string[]) => {
    if (onPropertyTypeChange) {
      onPropertyTypeChange(selectedTypes);
    }
  };

  const renderInputLocation = () => {
    return (
      <div className="flex-1 flex-shrink-0 lg:w-1/4">
        <RRSearchBox
          initialValue={defaultSearchText}
          onChange={handleSearchTextChange}
          className="flex-1"
        />
      </div>
    );
  };

  const renderInputCuisineType = () => {
    return (
      <div className="flex-1 flex-shrink-0 lg:w-1/4">
        <RestaurantType
          // activeTab={activeTab}
          className="flex-1"
          onSelectionChange={handleSelectionChange}
          initialValue={defaultSelectedItems}
        />
      </div>
    );
  };

  const renderInputPropertyType = () => {
    return (
      <div className="flex-1 flex-shrink-0 lg:w-1/4">
        <PropertyTypeSelect
          onChange={handlePropertyTypeSelect}
          defaultPropertyTypes={defaultPropertyTypes}
        />
      </div>
    );
  };

  const renderInputDistance = () => {
    return (
      <div className="flex-1 flex-shrink-0 lg:w-1/4">
        <DistanceRange
          activeTab={activeTab}
          onDistanceChange={handleDistanceChange}
          defaultSearchDistance={defaultSearchDistance}
        />
      </div>
    );
  };

  const renderSubmitButton = () => {
    return (
      <div className="flex-shrink-0 px-4 py-3">
        <ButtonSubmit
          type="submit"
          searchParams={{
            category: activeTab,
            query: searchText,
            distance: searchDistance,
            filters: selectedItems.length > 0 ? selectedItems.join(',') : '',
            propertyTypes: defaultPropertyTypes.length > 0 ? defaultPropertyTypes.join(',') : ''
          }}
        />
      </div>
    );
  };

  return (
    <form className={`w-full relative ${className}`} onSubmit={handleSubmit}>
      <div className="relative flex flex-col lg:flex-row lg:items-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-[2] lg:flex-row flex-col items-center">
          {renderInputLocation()}
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8 mx-2" />
          {renderInputCuisineType()}
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8 mx-2" />
          {renderInputPropertyType()}
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8 mx-2" />
          {renderInputDistance()}
        </div>
        {renderSubmitButton()}
      </div>
    </form>
  );
};

export default RestaurantSearchForm;
