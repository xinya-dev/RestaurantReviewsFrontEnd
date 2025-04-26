"use client";

import React, { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FireIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Checkbox from "@/shared/Checkbox";

interface FoodItem {
  name: string;
  description: string;
  checked: boolean;
  icon: string;
}

const popularFoods: FoodItem[] = [
  {
    name: "Biryani",
    description: "Fragrant rice dish with spices and meat",
    checked: false,
    icon: "🍚"
  },
  {
    name: "Pasta Carbonara",
    description: "Creamy pasta with eggs and bacon",
    checked: false,
    icon: "🍝"
  },
  {
    name: "Ramen",
    description: "Japanese noodle soup with rich broth",
    checked: false,
    icon: "🍜"
  },
  {
    name: "Tacos",
    description: "Mexican street food with various fillings",
    checked: false,
    icon: "🌮"
  },
  {
    name: "Butter Chicken",
    description: "Creamy Indian curry with tender chicken",
    checked: false,
    icon: "🍛"
  },
  {
    name: "Sushi Rolls",
    description: "Fresh fish and rice wrapped in seaweed",
    checked: false,
    icon: "🍣"
  },
  {
    name: "Pizza",
    description: "Italian flatbread with various toppings",
    checked: false,
    icon: "🍕"
  },
  {
    name: "Burger",
    description: "Juicy patty with fresh vegetables",
    checked: false,
    icon: "🍔"
  },
  {
    name: "Pad Thai",
    description: "Stir-fried rice noodles with peanuts",
    checked: false,
    icon: "🍜"
  }
];

interface PopularFoodsDropdownProps {
  onChange?: (selectedFoods: string[]) => void;
}

const PopularFoodsDropdown: React.FC<PopularFoodsDropdownProps> = ({ onChange }) => {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>(popularFoods);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFoodToggle = (foodName: string, isChecked: boolean) => {
    const updatedFoods = selectedFoods.map(food =>
      food.name === foodName
        ? { ...food, checked: isChecked }
        : food
    );
    setSelectedFoods(updatedFoods);
    onChange?.(updatedFoods.filter(f => f.checked).map(f => f.name));
  };

  const handleTooltipDeselect = (foodName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleFoodToggle(foodName, false);
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
    const updatedFoods = selectedFoods.map(food => ({ ...food, checked }));
    setSelectedFoods(updatedFoods);
    onChange?.(checked ? updatedFoods.map(f => f.name) : []);
  };

  const allChecked = selectedFoods.every(f => f.checked);
  const currentlySelected = selectedFoods.filter(f => f.checked);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            className={`flex items-center gap-1.5 px-1 py-1.5 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm text-gray-600 whitespace-nowrap transition-colors ${
              open ? "bg-gray-100" : ""
            }`}
          >
            <FireIcon className="w-8 h-8 stroke-2 text-green-600" />
            <span className="font-medium">Popular Foods</span>
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
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Trending Dishes</div>
              <div className="px-3 pb-2 text-sm text-neutral-600 dark:text-neutral-300">
                Explore what's popular right now. Find restaurants serving trending dishes and discover new favorites.
              </div>
              <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent px-3 pb-2">
                {currentlySelected.map((food) => (
                  <div key={food.name} className="flex items-center justify-between py-1 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="flex items-center gap-2">
                       <span>{food.icon}</span>
                       <span>{food.name}</span>
                    </span>
                    <button
                      onClick={(e) => handleTooltipDeselect(food.name, e)}
                      className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"
                      aria-label={`Deselect ${food.name}`}
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
                  {/* Select All Checkbox - Updated */}
                  <div className="flex items-center space-x-3 border-b pb-4">
                     <Checkbox
                       name="select-all-foods"
                       label="Select All Foods"
                       labelClassName="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                       checked={allChecked}
                       onChange={handleSelectAll}
                     />
                  </div>

                  {/* Three Column Grid with Scrollbar - Updated */}
                  <div className="overflow-y-auto max-h-[234px] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                      {selectedFoods.map((food) => (
                        <div
                          key={food.name}
                          className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 text-2xl">
                              {food.icon}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {food.name}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {food.description}
                              </p>
                            </div>
                          </div>
                           <Checkbox
                             name={food.name}
                             className="ml-auto flex-shrink-0"
                             checked={food.checked}
                             onChange={(checked) => handleFoodToggle(food.name, checked)}
                           />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedFoods(popularFoods.map(f => ({ ...f, checked: false })));
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

export default PopularFoodsDropdown; 