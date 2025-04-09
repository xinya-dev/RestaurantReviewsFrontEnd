"use client";

import React, { useEffect, useState } from "react";
import { FC } from "react";
import Checkbox from "@/shared/Checkbox";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

const cuisineTypes: CuisineType[] = [
  {
    name: "All",
    description: "All International Cuisines",
    checked: true,
    flag: "all"
  },
  {
    name: "Australian",
    description: "Modern Australian and Indigenous cuisine",
    checked: true,
    flag: "au"
  },
  {
    name: "Italian",
    description: "Pizza, Pasta, and Mediterranean flavors",
    checked: true,
    flag: "it"
  },
  {
    name: "Thai",
    description: "Authentic Thai dishes and street food",
    checked: true,
    flag: "th"
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
    name: "Greek",
    description: "Mediterranean Greek delicacies",
    checked: true,
    flag: "gr"
  },
  {
    name: "American",
    description: "Classic American comfort food",
    checked: true,
    flag: "us"
  },
  {
    name: "English",
    description: "Traditional British cuisine",
    checked: true,
    flag: "gb"
  },
  {
    name: "Japanese",
    description: "Sushi, Ramen, and Japanese dishes",
    checked: true,
    flag: "jp"
  },
  {
    name: "Vietnamese",
    description: "Authentic Vietnamese street food",
    checked: true,
    flag: "vn"
  },
  {
    name: "Mexican",
    description: "Traditional Mexican flavors",
    checked: true,
    flag: "mx"
  },
  {
    name: "French",
    description: "Classic French cuisine",
    checked: true,
    flag: "fr"
  },
  {
    name: "Spanish",
    description: "Spanish tapas and paella",
    checked: true,
    flag: "es"
  },
  {
    name: "Indonesian",
    description: "Traditional Indonesian dishes",
    checked: true,
    flag: "id"
  },
  {
    name: "Philippines",
    description: "Filipino specialties",
    checked: true,
    flag: "ph"
  },
  {
    name: "Middle Eastern",
    description: "Middle Eastern delicacies",
    checked: true,
    flag: "ae"
  },
  {
    name: "Singaporean",
    description: "Singapore's diverse cuisine",
    checked: true,
    flag: "sg"
  },
  {
    name: "Arab",
    description: "Traditional Arab cuisine",
    checked: true,
    flag: "sa"
  }
];

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

export interface RestaurantTypeSelectProps {
  onChange?: (data: any[]) => void;
  defaultValue?: any[];
  activeTab?: string;
}

const RestaurantTypeSelect: FC<RestaurantTypeSelectProps> = ({
  onChange,
  defaultValue,
  activeTab = "International Cuisines"
}) => {
  // Get the appropriate options based on the active tab
  const getOptionsForTab = () => {
    switch (activeTab) {
      case "Fast Food":
        return fastFoodTypes;
      case "Favorite Foods":
        return favouriteFoodTypes;
      default:
        return cuisineTypes;
    }
  };

  const [typeOfProperty, setTypeOfProperty] = React.useState<any[]>(
    defaultValue || getOptionsForTab()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<any[]>(
    defaultValue || getOptionsForTab()
  );

  // Update options when the active tab changes
  useEffect(() => {
    setTypeOfProperty(getOptionsForTab());
    setFilteredOptions(getOptionsForTab());
    setSearchQuery("");
  }, [activeTab]);

  useEffect(() => {
    if (!defaultValue) return;
    setTypeOfProperty(defaultValue);
    setFilteredOptions(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    // Filter options based on search query
    if (searchQuery.trim() === "") {
      setFilteredOptions(typeOfProperty);
    } else {
      const filtered = typeOfProperty.filter(
        (item) => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Ensure "All" option is included when filtering
      if (!filtered.some(item => item.name === "All")) {
        const allOption = typeOfProperty.find(item => item.name === "All");
        if (allOption) {
          filtered.unshift(allOption);
        }
      }
      
      setFilteredOptions(filtered);
    }
  }, [searchQuery, typeOfProperty]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    // Find the item in the original array
    const item = filteredOptions[index];
    const originalIndex = typeOfProperty.findIndex(i => i.name === item.name);
    
    let newState = [...typeOfProperty];
    
    if (item.name === "All") {
      // If "All" is clicked, update all checkboxes
      newState = newState.map(item => ({
        ...item,
        checked: checked
      }));
    } else {
      // Update individual checkbox
      newState[originalIndex] = {
        ...newState[originalIndex],
        checked: checked
      };
      
      // Update "All" checkbox based on other selections
      const allIndividualItemsChecked = newState.slice(1).every(item => item.checked);
      const allIndex = newState.findIndex(item => item.name === "All");
      if (allIndex !== -1) {
        newState[allIndex] = {
          ...newState[allIndex],
          checked: allIndividualItemsChecked
        };
      }
    }
    
    setTypeOfProperty(newState);
    // Only call onChange once the state is fully updated
    onChange && onChange(newState);
  };

  const isCuisineType = (item: any): item is CuisineType => {
    return 'flag' in item;
  };

  const getHeadingText = () => {
    switch (activeTab) {
      case "Fast Food":
        return "Fast Food Types";
      case "Favorite Foods":
        return "Favourite Categories";
      default:
        return "International Cuisines";
    }
  };

  return (
    <div className="p-5">
      <span className="block font-semibold text-xl sm:text-2xl mb-5">
        {getHeadingText()}
      </span>
      
      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <style jsx global>{`
        .cuisine-list::-webkit-scrollbar {
          width: 6px;
        }
        .cuisine-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .cuisine-list::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 10px;
        }
        .cuisine-list::-webkit-scrollbar-thumb:hover {
          background: #1d4ed8;
        }
        .cuisine-list {
          scrollbar-width: thin;
          scrollbar-color: #2563eb #f1f1f1;
        }
      `}</style>
      
      <div className="cuisine-list relative flex flex-col space-y-4 max-h-[36vh] overflow-y-auto pr-2 pb-4 border border-gray-100 rounded-lg p-3">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-3">
              <div className="flex-none">
                <input
                  id={`option-${item.name}`}
                  name={`option-${item.name}`}
                  type="checkbox"
                  className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700 dark:checked:bg-primary-500 focus:ring-primary-500"
                  checked={item.checked}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
              </div>
              {isCuisineType(item) && item.flag !== 'all' && (
                <div className="flex-none w-6">
                  <Image
                    src={`https://flagcdn.com/24x18/${item.flag}.png`}
                    alt={`${item.name} flag`}
                    width={24}
                    height={18}
                    className="rounded-sm"
                  />
                </div>
              )}
              <div className="flex-1">
                <label
                  htmlFor={`option-${item.name}`}
                  className="flex flex-col cursor-pointer"
                >
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {item.name}
                  </span>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {item.description}
                  </p>
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No options found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantTypeSelect;
