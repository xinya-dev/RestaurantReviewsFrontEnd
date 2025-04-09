"use client";

import React, { FC, useState } from "react";

interface PropertyType {
  id: number;
  name: string;
}

interface Props {
  onChange?: (data: PropertyType[]) => void;
  defaultValue?: PropertyType[];
}

const OPTIONS: PropertyType[] = [
  { id: 1, name: "Duplex House" },
  { id: 2, name: "Single Family Home" },
  { id: 3, name: "Townhouse" },
  { id: 4, name: "Garden Cottage" },
  { id: 5, name: "Apartment" },
  { id: 6, name: "Villa" },
  { id: 7, name: "Penthouse" },
  { id: 8, name: "Studio" },
];

const PropertyTypeSelect: FC<Props> = ({
  onChange,
  defaultValue = [],
}) => {
  const [selected, setSelected] = useState<PropertyType[]>(defaultValue);

  // Function to toggle selection
  const handleSelect = (property: PropertyType) => {
    const isSelected = selected.some(item => item.id === property.id);
    let newSelected: PropertyType[];
    
    if (isSelected) {
      newSelected = selected.filter(item => item.id !== property.id);
    } else {
      newSelected = [...selected, property];
    }
    
    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  // Get a simple count of selected properties for the text display
  const selectedCount = selected.length;
  
  return (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
        Property Types
      </h3>
      <div className="relative mt-6">
        <div className="flex flex-col space-y-4">
          {OPTIONS.map((property) => {
            const isChecked = selected.some((item) => item.id === property.id);
            return (
              <div
                key={property.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-all duration-200"
                onClick={() => handleSelect(property)}
              >
                <span className="text-neutral-700 dark:text-neutral-200 font-medium">
                  {property.name}
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={isChecked}
                    onChange={() => handleSelect(property)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 flex flex-col items-center">
        <div className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
          {selectedCount === 0
            ? "No property types selected"
            : selectedCount === 1
            ? "1 property type selected"
            : `${selectedCount} property types selected`}
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeSelect;
