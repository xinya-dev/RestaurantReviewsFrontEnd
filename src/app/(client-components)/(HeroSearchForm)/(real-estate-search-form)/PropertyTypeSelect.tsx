"use client";
import React, { Fragment, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";
import { ClassOfProperties } from "../../type";
import { HomeIcon } from "@heroicons/react/24/outline";

const defaultPropertyType: ClassOfProperties[] = [
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

export interface PropertyTypeSelectProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [typeOfProperty, setTypeOfProperty] =
    React.useState<ClassOfProperties[]>(defaultPropertyType);
  const [searchTerm, setSearchTerm] = React.useState("");

  let typeOfPropertyText = "";
  if (typeOfProperty && typeOfProperty.length > 0) {
    typeOfPropertyText = typeOfProperty
      .filter((item) => item.checked)
      .map((item) => {
        return item.name;
      })
      .join(", ");
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProperties = typeOfProperty.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Popover className="flex relative flex-1">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
              }`}
            onClickCapture={() => document.querySelector("html")?.click()}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <HomeIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-lg font-semibold overflow-hidden">
                <span className="line-clamp-1">
                  All...
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                Select Property Type
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
            <Popover.Panel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <Checkbox
                  name="All"
                  label="All"
                  defaultChecked={typeOfProperty.every(item => item.checked)}
                  onChange={(e) => {
                    const newState = typeOfProperty.map(item => ({ ...item, checked: e }));
                    setTypeOfProperty(newState);
                    onChange && onChange(newState);
                  }}
                />
              </div>

              <div className="">
                <div className="relative flex flex-col space-y-5">
                  {filteredProperties.map((item, index) => (
                    <div key={item.name} className="">
                      <Checkbox
                        name={item.name}
                        label={item.name}
                        subLabel={item.description}
                        defaultChecked={typeOfProperty[index].checked}
                        onChange={(e) => {
                          const newState = typeOfProperty.map((item, i) => {
                            if (i === index) {
                              return { ...item, checked: e };
                            }
                            return item;
                          });
                          setTypeOfProperty(() => {
                            return newState;
                          });
                          onChange && onChange(newState);
                        }}
                      />
                    </div>
                  ))}
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
