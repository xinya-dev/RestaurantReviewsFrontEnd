"use client";

import React, { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CurrencyDollarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Checkbox from "@/shared/Checkbox";

interface SpecialItem {
  name: string;
  description: string;
  checked: boolean;
  icon: string;
  price: string;
}

const todaysSpecials: SpecialItem[] = [
  {
    name: "Chef's Special Pasta",
    description: "Handmade pasta with truffle cream sauce",
    checked: true,
    icon: "🍝",
    price: "$18.99"
  },
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon butter",
    checked: true,
    icon: "🐟",
    price: "$24.99"
  },
  {
    name: "Beef Wellington",
    description: "Tender beef wrapped in puff pastry",
    checked: false,
    icon: "🥩",
    price: "$32.99"
  },
  {
    name: "Vegetable Risotto",
    description: "Creamy arborio rice with seasonal vegetables",
    checked: false,
    icon: "🍚",
    price: "$16.99"
  },
  {
    name: "Lobster Thermidor",
    description: "Classic French lobster dish with cheese",
    checked: false,
    icon: "🦞",
    price: "$39.99"
  },
  {
    name: "Chocolate Soufflé",
    description: "Warm chocolate dessert with vanilla ice cream",
    checked: false,
    icon: "🍫",
    price: "$12.99"
  },
  {
    name: "Seafood Paella",
    description: "Spanish rice dish with fresh seafood",
    checked: false,
    icon: "🥘",
    price: "$28.99"
  },
  {
    name: "Duck Confit",
    description: "Slow-cooked duck leg with potatoes",
    checked: false,
    icon: "🦆",
    price: "$26.99"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian coffee dessert",
    checked: false,
    icon: "☕",
    price: "$10.99"
  }
];

interface TodaysSpecialsDropdownProps {
  onChange?: (selectedSpecials: string[]) => void;
}

const TodaysSpecialsDropdown: React.FC<TodaysSpecialsDropdownProps> = ({ onChange }) => {
  const [selectedSpecials, setSelectedSpecials] = useState<SpecialItem[]>(todaysSpecials);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpecialToggle = (specialName: string, isChecked: boolean) => {
    const updatedSpecials = selectedSpecials.map(special =>
      special.name === specialName
        ? { ...special, checked: isChecked }
        : special
    );
    setSelectedSpecials(updatedSpecials);
    onChange?.(updatedSpecials.filter(s => s.checked).map(s => s.name));
  };

  const handleTooltipDeselect = (specialName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleSpecialToggle(specialName, false);
  };

  const handleMouseEnterButton = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setIsTooltipOpen(true);
  };

  const handleMouseLeaveButton = () => {
    tooltipTimeoutRef.current = setTimeout(() => setIsTooltipOpen(false), 150);
  };

  const handleMouseEnterTooltip = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
  };

  const handleMouseLeaveTooltip = () => {
    tooltipTimeoutRef.current = setTimeout(() => setIsTooltipOpen(false), 150);
  };

  const handleSelectAll = (checked: boolean) => {
    const updatedSpecials = selectedSpecials.map(special => ({ ...special, checked }));
    setSelectedSpecials(updatedSpecials);
    onChange?.(checked ? updatedSpecials.map(s => s.name) : []);
  };

  const allChecked = selectedSpecials.every(s => s.checked);
  const currentlySelected = selectedSpecials.filter(s => s.checked);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            className={`flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm text-gray-600 whitespace-nowrap transition-colors ${
              open ? "bg-indigo-100" : ""
            }`}
          >
            <CurrencyDollarIcon className="w-5 h-5 stroke-2" />
            <span className="font-medium">Today's Specials</span>
            <span className="text-xs text-indigo-500">
              ({currentlySelected.length})
            </span>
          </Popover.Button>

          {/* Tooltip */}
          {isTooltipOpen && !open && currentlySelected.length > 0 && (
            <div
              onMouseEnter={handleMouseEnterTooltip}
              onMouseLeave={handleMouseLeaveTooltip}
              className="absolute z-[9999] w-64 bg-white dark:bg-neutral-800 mt-2 rounded-xl shadow-xl border dark:border-neutral-700"
            >
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Selected Specials</div>
              <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent px-3 pb-2">
                {currentlySelected.map((special) => (
                  <div key={special.name} className="flex items-center justify-between py-1 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="flex items-center gap-2">
                      <span>{special.icon}</span>
                      <span className="truncate" title={special.name}>{special.name}</span>
                      <span className="text-xs text-indigo-500 flex-shrink-0">{special.price}</span>
                    </span>
                    <button
                      onClick={(e) => handleTooltipDeselect(special.name, e)}
                      className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 flex-shrink-0 ml-1"
                      aria-label={`Deselect ${special.name}`}
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="fixed z-[9999] w-screen max-w-4xl px-4 mt-3 left-1/2 -translate-x-1/2 top-[200px] sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-6 py-6 space-y-6">
                  {/* Select All Checkbox */}
                  <div className="flex items-center space-x-3 border-b pb-4">
                    <Checkbox
                      name="select-all-specials"
                      label="Select All Specials"
                      labelClassName="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                      checked={allChecked}
                      onChange={handleSelectAll}
                    />
                  </div>

                  {/* Three Column Grid with Scrollbar */}
                  <div className="overflow-y-auto max-h-[289px] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                      {selectedSpecials.map((special) => (
                        <div
                          key={special.name}
                          className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 text-2xl">
                              {special.icon}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {special.name}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {special.description}
                              </p>
                              <p className="text-xs font-medium text-indigo-600">
                                {special.price}
                              </p>
                            </div>
                          </div>
                          <Checkbox
                            name={special.name}
                            className="ml-auto flex-shrink-0"
                            checked={special.checked}
                            onChange={(checked) => handleSpecialToggle(special.name, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedSpecials(todaysSpecials.map(s => ({ ...s, checked: false })));
                      onChange?.([]);
                    }}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => close()}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default TodaysSpecialsDropdown; 