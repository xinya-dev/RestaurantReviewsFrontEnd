"use client";
import React, { Fragment, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";
import { ClassOfProperties } from "../../type";
import { HomeIcon } from "@heroicons/react/24/outline";

const defaultPropertyType: ClassOfProperties[] = [
  {
    name: "All",
    description: "All types of restaurants",
    checked: true,
  },
  {
    name: "Family Restaurant",
    description: "Kid-friendly, casual with larger portions.",
    checked: true,
  },
  {
    name: "Fine Dining",
    description: "High-end, full-service with premium menu and elegant ambiance ideal for romantic dinners.",
    checked: true,
  },
  {
    name: "Casual Dining",
    description: "Sit-down service with moderate pricing and varied menu.",
    checked: true,
  },
  {
    name: "Fast Casual",
    description: "Higher quality than fast food, no table service.",
    checked: true,
  },
  {
    name: "Fast Food",
    description: "Quick service, often drive-thru or takeaway focused.",
    checked: true,
  },
  {
    name: "Café / Coffee Shop",
    description: "Light meals, coffee, pastries, relaxed setting.",
    checked: true,
  },
  {
    name: "Buffet",
    description: "All-you-can-eat or self-service restaurant.",
    checked: true,
  },
  {
    name: "Food Truck",
    description: "Mobile kitchen offering niche or gourmet street food.",
    checked: true,
  },
  {
    name: "Steakhouse",
    description: "Specializes in beef and grilled meats.",
    checked: true,
  },
  {
    name: "Seafood Restaurant",
    description: "Focuses on fish, oysters, and other seafood dishes.",
    checked: true,
  },
  {
    name: "Healthy / Vegan / Vegetarian",
    description: "Offers only plant-based or vegetarian meals.",
    checked: true,
  },
  {
    name: "Dessert Bar",
    description: "Focus on sweets — gelato, cakes, pancakes, etc.",
    checked: true,
  },
  {
    name: "Breakfast / Brunch",
    description: "Serves morning and mid-day meals.",
    checked: true,
  },
  {
    name: "Tapas / Small Plates",
    description: "Share-style small dishes.",
    checked: true,
  },
  {
    name: "Bar & Grill / Gastropub",
    description: "Upscale pub-style food with alcohol.",
    checked: true,
  },
  {
    name: "Take Away",
    description: "",
    checked: true,
  },
  {
    name: "Dinner & Drinks",
    description: "",
    checked: true,
  },
  {
    name: "Bars & Clubs",
    description: "",
    checked: true,
  },
];

interface PropertyTypeSelectProps {
  onChange?: (selectedTypes: string[]) => void;
  fieldClassName?: string;
  defaultPropertyTypes?: string[];
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  defaultPropertyTypes = []
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = React.useState<'top' | 'bottom'>('bottom');
  
  const [typeOfProperty, setTypeOfProperty] = React.useState<ClassOfProperties[]>(() => {
    // Initialize with all items checked if no defaultPropertyTypes provided
    if (!defaultPropertyTypes || defaultPropertyTypes.length === 0) {
      return defaultPropertyType;
    }
    
    // Otherwise, check only the items in defaultPropertyTypes
    const allChecked = defaultPropertyType.slice(1).every(item => defaultPropertyTypes.includes(item.name));
    return defaultPropertyType.map(item => ({
      ...item,
      checked: item.name === "All" ? allChecked : defaultPropertyTypes.includes(item.name)
    }));
  });

  // Add effect to handle dropdown positioning
  React.useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        const dropdownHeight = 320; // Height of dropdown

        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
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

  const handleCheckboxChange = (index: number, checked: boolean) => {
    let newState = [...typeOfProperty];
    
    if (index === 0) {
      newState = newState.map(item => ({
        ...item,
        checked: checked
      }));
    } else {
      newState[index] = {
        ...newState[index],
        checked: checked
      };
      
      const allIndividualItemsChecked = newState.slice(1).every(item => item.checked);
      newState[0] = {
        ...newState[0],
        checked: allIndividualItemsChecked
      };
    }
    
    setTypeOfProperty(newState);
    
    if (onChange) {
      const selectedTypes = newState
        .filter(item => item.checked && item.name !== "All")
        .map(item => item.name);
      onChange(selectedTypes);
    }
  };

  let typeOfPropertyText = "";
  if (typeOfProperty && typeOfProperty.length > 0) {
    const checkedItems = typeOfProperty.filter((item) => item.checked);
    if (checkedItems.length === typeOfProperty.length) {
      typeOfPropertyText = "All...";
    } else if (checkedItems.length > 0) {
      typeOfPropertyText = checkedItems
        .filter((item) => item.name !== "All")
        .map((item) => item.name)
        .join(", ");
    }
  }

  const filteredProperties = typeOfProperty.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Popover className="flex relative flex-1">
      {({ open, close }) => (
        <>
          <Popover.Button
            ref={buttonRef}
            className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
              }`}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <HomeIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-lg font-semibold overflow-hidden">
                <span className="line-clamp-1">
                  {typeOfPropertyText || "All..."}
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                Select Restaurant Type
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
              className={`absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800  h-[250px] ${
                dropdownPosition === 'top' 
                  ? 'bottom-[calc(100%+1.5rem)]' 
                  : 'top-[calc(100%+1.5rem)]'
              } py-4 sm:py-5 px-4 sm:px-8 rounded-3xl shadow-xl`}
            >
              <div 
                className="relative flex flex-col space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent h-[210px] overflow-y-auto" 
                style={{ maxHeight: '320px', overflowY: 'auto' }}
              >
                {filteredProperties.map((item, index) => (
                  <div key={item.name} className="flex items-center space-x-3">
                    <div className="flex-none">
                      <input
                        id={`property-type-${item.name}`}
                        name={`property-type-${item.name}`}
                        type="checkbox"
                        className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700 dark:checked:bg-primary-500 focus:ring-primary-500"
                        checked={item.checked}
                        onChange={(e) => {
                          // Call handleCheckboxChange with the index and new checked state
                          handleCheckboxChange(index, !item.checked);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`property-type-${item.name}`}
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
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PropertyTypeSelect;
