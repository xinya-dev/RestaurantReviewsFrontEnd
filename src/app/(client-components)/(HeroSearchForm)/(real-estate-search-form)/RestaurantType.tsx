"use client";
import React, { Fragment, FC, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";
import { ClassOfProperties } from "../../type";
import { HomeIcon, GlobeAsiaAustraliaIcon, BoltIcon, HeartIcon } from "@heroicons/react/24/outline";
import { SearchTab } from "../RRSearchForm";
import Image from "next/image";

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

export interface PropertyTypeSelectProps {
  onChange?: (data: CuisineType[] | FastFoodType[] | FavouriteFoodType[]) => void;
  fieldClassName?: string;
  activeTab?: SearchTab;
  className?: string;
  onSelectionChange?: (selectedItems: string[]) => void;
  initialValue?: string[];
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

// For debugging component lifecycle
const DEBUG = false;

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  activeTab = "Near Me",
  className,
  initialValue = [],
  onSelectionChange
}) => {
  if (DEBUG) console.log("[PropertyTypeSelect] Rendering with initialValue:", initialValue);
  
  const getDefaultOptions = () => {
    switch (activeTab) {
      case "International Cuisine":
        return cuisineTypes;
      case "Fast Food":
        return fastFoodTypes;
      case "Favourite Foods":
        return favouriteFoodTypes;
      default:
        return [];
    }
  };

  const [typeOfProperty, setTypeOfProperty] = React.useState(() => {
    // Get the default options based on active tab
    const options = getDefaultOptions();
    
    // For homepage (no initialValue), all options should be checked
    if (!initialValue || initialValue.length === 0) {
      return options.map(option => ({
        ...option,
        checked: true // Ensure all are checked on homepage
      }));
    }
    
    // For filtered view, only options in initialValue should be checked
    const allChecked = options.slice(1).every(option => initialValue.includes(option.name));
    return options.map(option => ({
      ...option,
      checked: option.name === "All" ? allChecked : initialValue.includes(option.name)
    }));
  });
  
  const [dropdownPosition, setDropdownPosition] = React.useState<'top' | 'bottom'>('bottom');
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  
  // Listen for the custom dropdown event
  useEffect(() => {
    const handleOpenSearchDropdown = (event: Event) => {
      // Check if the event is our custom event and type is 'filter'
      if (event instanceof CustomEvent && 
          event.detail && 
          event.detail.type === 'filter' && 
          buttonRef.current) {
        // Click the button to open the dropdown
        buttonRef.current.click();
      }
    };
    
    // Add event listener
    window.addEventListener('openSearchDropdown', handleOpenSearchDropdown);
    
    // Clean up
    return () => {
      window.removeEventListener('openSearchDropdown', handleOpenSearchDropdown);
    };
  }, []);

  useEffect(() => {
    if (DEBUG) console.log("[PropertyTypeSelect] activeTab changed:", activeTab);
    
    const options = getDefaultOptions();
    
    // For homepage (no initialValue), ensure all options are checked
    if (!initialValue || initialValue.length === 0) {
      if (DEBUG) console.log("[PropertyTypeSelect] Setting default checked state for homepage");
      setTypeOfProperty(options.map(option => ({
        ...option,
        checked: true // Ensure all are checked on homepage
      })));
      return;
    }
    
    // For filtered view, only options in initialValue should be checked
    if (DEBUG) console.log("[PropertyTypeSelect] Setting filtered checked state based on:", initialValue);
    const allChecked = options.slice(1).every(option => initialValue.includes(option.name));
    const updatedOptions = options.map(option => ({
      ...option,
      checked: option.name === "All" ? allChecked : initialValue.includes(option.name)
    }));
    setTypeOfProperty(updatedOptions);
  }, [activeTab]);  // Remove initialValue from dependencies to prevent rerendering when it changes

  // Only handle explicit changes to initialValue from props, separate from internal checkbox state
  useEffect(() => {
    if (DEBUG) console.log("[PropertyTypeSelect] initialValue changed:", initialValue);
    
    // Skip this effect on initial render to avoid conflicts with the default state
    if (!prevTypeOfPropertyRef.current) {
      return;
    }
    
    if (initialValue && initialValue.length > 0) {
      if (DEBUG) console.log("[PropertyTypeSelect] Updating checkboxes based on new initialValue");
      const options = getDefaultOptions();
      const allChecked = options.slice(1).every(option => initialValue.includes(option.name));
      const updatedOptions = options.map(option => ({
        ...option,
        checked: option.name === "All" ? allChecked : initialValue.includes(option.name)
      }));
      setTypeOfProperty(updatedOptions);
    }
  }, [initialValue]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    // Create a new copy of the state
    let newState = [...typeOfProperty];
    
    if (index === 0) {
      // If "All" checkbox is clicked, update all checkboxes to match
      newState = newState.map(item => ({
        ...item,
        checked: checked
      }));
    } else {
      // Update the specific checkbox that was clicked
      newState[index] = {
        ...newState[index],
        checked: checked
      };
      
      // Update "All" checkbox based on whether all individual items are checked
      // The "All" checkbox should only be checked if ALL other checkboxes are checked
      const allIndividualItemsChecked = newState.slice(1).every(item => item.checked);
      
      newState[0] = {
        ...newState[0],
        checked: allIndividualItemsChecked
      };
    }
    
    // Create a completely new array to ensure React detects the change
    const finalState = [...newState];
    
    // Update the state with the new array
    setTypeOfProperty(finalState);
    
    // Call external onChange handler
    if (onChange) {
      // Make sure we pass a new array reference
      onChange([...finalState]);
    }
  };

  const isCuisineType = (item: any): item is CuisineType => {
    return 'flag' in item;
  };

  const getIcon = () => {
    switch (activeTab) {
      case "International Cuisine":
        return GlobeAsiaAustraliaIcon;
      case "Fast Food":
        return BoltIcon;
      case "Favourite Foods":
        return HeartIcon;
      default:
        return HomeIcon;
    }
  };

  const getLabel = () => {
    switch (activeTab) {
      case "International Cuisine":
        return "International Cuisines";
      case "Fast Food":
        return "Fast Food Types";
      case "Favourite Foods":
        return "Favourite Categories";
      default:
        return "Select Type";
    }
  };

  let typeOfPropertyText = "";
  if (typeOfProperty && typeOfProperty.length > 0) {
    const checkedItems = typeOfProperty.filter((item) => item.checked);
    if (checkedItems.length === typeOfProperty.length) {
      typeOfPropertyText = `All ${getLabel()}`;
    } else if (checkedItems.length > 0) {
      typeOfPropertyText = checkedItems
        .filter((item) => item.name !== "All")
        .map((item) => item.name)
      .join(", ");
    }
  }

  const Icon = getIcon();

  React.useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        
        if (spaceBelow < 300 && spaceAbove > spaceBelow) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  // Use useRef to track the previous state of typeOfProperty
  const prevTypeOfPropertyRef = React.useRef<typeof typeOfProperty | null>(null);
  
  useEffect(() => {
    // Only call onSelectionChange if there's an actual change in selected items
    if (typeOfProperty && typeOfProperty.length > 0 && onSelectionChange) {
      const selectedItems = typeOfProperty
        .filter(item => item.checked && item.name !== "All")
        .map(item => item.name);
      
      // Get the previous selected items
      const prevSelectedItems = prevTypeOfPropertyRef.current
        ? prevTypeOfPropertyRef.current
            .filter(item => item.checked && item.name !== "All")
            .map(item => item.name)
        : [];
      
      // Check if the selected items have actually changed
      const hasChanged = 
        prevSelectedItems.length !== selectedItems.length ||
        selectedItems.some((item, i) => item !== prevSelectedItems[i]);
      
      // Only call onSelectionChange if there's a change
      if (hasChanged) {
        onSelectionChange(selectedItems);
      }
      
      // Update the ref to the current state
      prevTypeOfPropertyRef.current = [...typeOfProperty];
    }
  }, [typeOfProperty, onSelectionChange]);

  return (
    <Popover className={`flex relative ${className || 'flex-1'}`}>
      {({ open, close }) => (
        <>
          <Popover.Button
            ref={buttonRef}
            className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${
              open ? "nc-hero-field-focused" : ""
              }`}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <Icon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-lg font-semibold overflow-hidden">
                <span className="line-clamp-1">
                  {typeOfPropertyText || getLabel()}
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                {getLabel()}
              </span>
            </div>
          </Popover.Button>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel 
              className={`absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 ${
                dropdownPosition === 'top' 
                  ? 'bottom-full mb-3' 
                  : 'top-full mt-3'
              } py-4 sm:py-5 px-4 sm:px-8 rounded-3xl shadow-xl`}
              style={{ 
                maxHeight: '49vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#9333ea transparent'
              }}
            >
              <style jsx global>{`
                .cuisine-dropdown::-webkit-scrollbar {
                  width: 6px;
                }
                .cuisine-dropdown::-webkit-scrollbar-track {
                  background: transparent;
                }
                .cuisine-dropdown::-webkit-scrollbar-thumb {
                  background-color: #9333ea;
                  border-radius: 20px;
                  border: 2px solid transparent;
                }
                .cuisine-dropdown {
                  scrollbar-width: thin;
                  scrollbar-color: #9333ea transparent;
                }
              `}</style>
              <div className="cuisine-dropdown">
                <div className="relative flex flex-col space-y-4">
                  {typeOfProperty.map((item, index) => {
                    const isAllOption = index === 0;
                    return (
                      <div key={item.name} className="flex items-center space-x-3">
                        <div className="flex-none">
                          <input
                            id={`${activeTab}-${item.name}`}
                            name={`${activeTab}-${item.name}`}
                            type="checkbox"
                            className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700 dark:checked:bg-primary-500 focus:ring-primary-500"
                            checked={item.checked}
                            onChange={(e) => {
                              // Prevent event bubbling and ensure clean handling
                              e.stopPropagation();
                              e.preventDefault();
                              // Call handleCheckboxChange with the index and new checked state
                              handleCheckboxChange(index, !item.checked);
                            }}
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
                            htmlFor={`${activeTab}-${item.name}`}
                            className="flex flex-col cursor-pointer"
                            onClick={(e) => {
                              // Prevent label click from interfering with checkbox
                              e.stopPropagation();
                            }}
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
                    );
                  })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PropertyTypeSelect;
