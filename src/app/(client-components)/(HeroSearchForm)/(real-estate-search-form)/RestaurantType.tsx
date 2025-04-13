"use client";
import React, { Fragment, FC, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";
import { ClassOfProperties } from "../../type";
import { HomeIcon, GlobeAsiaAustraliaIcon, BoltIcon, HeartIcon } from "@heroicons/react/24/outline";
import { SearchTab } from "../RRSearchForm";
import Image from "next/image";

interface CuisineType {
  name: CuisineName;
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

// Add type for cuisine names
type CuisineName = 
  | "All"
  | "Australian"
  | "Italian"
  | "Thai"
  | "Indian"
  | "Chinese"
  | "Greek"
  | "American"
  | "English"
  | "Japanese"
  | "Vietnamese"
  | "Mexican"
  | "French"
  | "Spanish"
  | "Indonesian"
  | "Philippines"
  | "Middle Eastern"
  | "Singapore"
  | "Arab";

const cuisineImages: Record<CuisineName, string> = {
  All: "/images/cuisines/All.jpeg",
  Australian: "/images/cuisines/Australian.jpg",
  Italian: "/images/cuisines/Italy.jpeg",
  Thai: "/images/cuisines/Thai.jpg",
  Indian: "/images/cuisines/India.jpg",
  Chinese: "/images/cuisines/Chinese.png",
  Greek: "/images/cuisines/All.jpeg",
  American: "/images/cuisines/United States.jpg",
  English: "/images/cuisines/United Kingdom.jpg",
  Japanese: "/images/cuisines/Japan.jpg",
  Vietnamese: "/images/cuisines/Vietnam.jpg",
  Mexican: "/images/cuisines/Mexico.jpg",
  French: "/images/cuisines/France.jpg",
  Spanish: "/images/cuisines/Spanish.jpg",
  Indonesian: "/images/cuisines/Indonesia.jpg",
  Philippines: "/images/cuisines/Philippines.jpg",
  "Middle Eastern": "/images/cuisines/Middle East.jpg",
  Singapore: "/images/cuisines/Singapore.jpg",
  Arab: "/images/cuisines/Middle East.jpg"
};

const cuisineTypes: CuisineType[] = [
  {
    name: "All",
    description: "All International Cuisines",
    checked: true,
    flag: "un"  // United Nations flag represents global/international
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
    name: "Singapore",
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

  const [dropdownPosition, setDropdownPosition] = React.useState<{
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  }>({ horizontal: 'center', vertical: 'bottom' });
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

  // Update dropdown position based on button position
  React.useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const dropdownWidth = 1100; // Width of the dropdown
        const dropdownHeight = 400; // Approximate height of the dropdown
        const halfDropdownWidth = dropdownWidth / 2;
        
        // Calculate horizontal position
        const buttonCenter = buttonRect.left + (buttonRect.width / 2);
        const leftIfCentered = buttonCenter - halfDropdownWidth;
        const rightIfCentered = buttonCenter + halfDropdownWidth;

        // Calculate vertical space
        const spaceBelow = windowHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        // Set horizontal position
        const horizontal = leftIfCentered < 20 
          ? 'left' 
          : rightIfCentered > windowWidth - 20 
            ? 'right' 
            : 'center';

        // Set vertical position
        const vertical = spaceBelow < dropdownHeight && spaceAbove > spaceBelow 
          ? 'top' 
          : 'bottom';

        setDropdownPosition({ horizontal, vertical });
      }
    };

    // Update position on mount and window resize
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
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
            className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
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
              static
              className={`will-change-transform sub-menu absolute transform z-10 w-[1100px] px-2 sm:px-0 ${
                dropdownPosition.vertical === 'top'
                  ? 'bottom-[calc(100%+1rem)]'
                  : 'top-[calc(100%+1rem)]'
              } ${
                dropdownPosition.horizontal === 'left'
                  ? 'left-0'
                  : dropdownPosition.horizontal === 'right'
                  ? 'right-0'
                  : 'left-1/2 -translate-x-1/2'
              }`}
            >
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10">
                <div className={`relative bg-white dark:bg-neutral-900 p-8`}>
                  {activeTab === "International Cuisine" ? (
                    // Grid view for cuisine types
                    <div 
                      className="grid grid-cols-8 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent"
                      style={{
                        scrollbarWidth: 'thin',
                        msOverflowStyle: 'none',
                        gridAutoRows: 'min-content',
                        maxHeight: '180px', // Height of one row plus some padding
                      }}
                    >
                      {typeOfProperty.map((item, index) => {
                        const cuisineItem = item as CuisineType;
                        return (
                          <div 
                            key={item.name} 
                            className={`group cursor-pointer  transition-all duration-300 relative ${
                              item.checked ? 'ring-1 ring-primary-50' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCheckboxChange(index, !item.checked);
                            }}
                          >
                            {/* Checkbox indicator */}
                            <div className={`absolute top-2 right-2 z-20 w-5 h-5 rounded-full border-2 ${
                              item.checked 
                                ? 'bg-primary-500 border-primary-500' 
                                : 'bg-white border-neutral-300 dark:border-neutral-600'
                            }`}>
                              {item.checked && (
                                <svg className="w-full h-full text-white" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                              )}
                            </div>
                            
                            <div className="aspect-w-3 aspect-h-2 overflow-hidden relative ">
                              {/* Flag Image (shown by default) */}
                              <div className="absolute inset-0 transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:opacity-0">
                                <Image 
                                  alt={`${cuisineItem.name} flag`}
                                  src={`https://flagcdn.com/w320/${cuisineItem.flag}.png`}
                                  fill
                                  className="object-cover "
                                  sizes="(max-width: 640px) 160px, 320px "
                                  priority
                                />
                              </div>
                              {/* Cuisine Image (shown on hover) */}
                              <div className="absolute inset-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                <Image 
                                  alt={`${cuisineItem.name} cuisine`}
                                  src={cuisineImages[cuisineItem.name as CuisineName] || `/images/cuisines/default.jpg`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 160px, 320px"
                                />
                                {/* Dark overlay for better text readability */}
                                <div className="absolute inset-0 bg-black bg-opacity-5 transition-opacity duration-300"></div>
                              </div>
                            </div>
                            <div className="relative mt-2 text-center h-12 flex flex-col items-center justify-center">
                              {/* Name (shown by default) */}
                              <h3 className="absolute w-full text-sm font-medium text-neutral-900 dark:text-neutral-200 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:opacity-0 line-clamp-1">
                                {item.name}
                              </h3>
                              {/* Description (shown on hover) */}
                              <p className="absolute w-full text-xs text-neutral-500 dark:text-neutral-400 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 px-2 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // List view for other types
                    <div className="flex flex-col space-y-4 max-h-[320px] overflow-y-auto">
                  {typeOfProperty.map((item, index) => (
                        <div 
                          key={item.name}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                            item.checked ? 'bg-neutral-100 dark:bg-neutral-800' : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCheckboxChange(index, !item.checked);
                          }}
                        >
                          {/* Checkbox */}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            item.checked 
                              ? 'bg-primary-500 border-primary-500' 
                              : 'border-neutral-300 dark:border-neutral-600'
                          }`}>
                            {item.checked && (
                              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                              </svg>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-200">
                              {item.name}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item.description}
                            </p>
                          </div>
                    </div>
                  ))}
                    </div>
                  )}
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
