"use client";

import React, { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Checkbox from "@/shared/Checkbox";

interface DishItem {
  name: string;
  description: string;
  checked: boolean;
  icon: string;
}

const dishes: DishItem[] = [
  {
    name: "Pizza Margherita",
    description: "Classic Italian pizza with tomato and mozzarella",
    checked: false,
    icon: "🍕"
  },
  {
    name: "Sushi Platter",
    description: "Assorted fresh sushi and sashimi",
    checked: false,
    icon: "🍣"
  },
  {
    name: "Chicken Tikka Masala",
    description: "Grilled chicken in creamy tomato sauce",
    checked: false,
    icon: "🍗"
  },
  {
    name: "Beef Burger",
    description: "Juicy beef patty with fresh toppings",
    checked: false,
    icon: "🍔"
  },
  {
    name: "Pad Thai",
    description: "Stir-fried rice noodles with peanuts",
    checked: false,
    icon: "🍜"
  },
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with dressing",
    checked: false,
    icon: "🥗"
  },
  {
    name: "Chocolate Cake",
    description: "Rich and moist chocolate dessert",
    checked: false,
    icon: "🍰"
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with toppings",
    checked: false,
    icon: "🍦"
  },
  {
    name: "Fruit Smoothie",
    description: "Fresh blended fruits and yogurt",
    checked: false,
    icon: "🥤"
  }
];

interface FavouriteDishDropdownProps {
  onChange?: (selectedDishes: string[]) => void;
}

const FavouriteDishDropdown: React.FC<FavouriteDishDropdownProps> = ({ onChange }) => {
  const [selectedDishes, setSelectedDishes] = useState<DishItem[]>(dishes);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDishToggle = (dishName: string, isChecked: boolean) => {
    const updatedDishes = selectedDishes.map(dish =>
      dish.name === dishName
        ? { ...dish, checked: isChecked }
        : dish
    );
    setSelectedDishes(updatedDishes);
    onChange?.(updatedDishes.filter(d => d.checked).map(d => d.name));
  };

  const handleTooltipDeselect = (dishName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleDishToggle(dishName, false);
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
    const updatedDishes = selectedDishes.map(dish => ({ ...dish, checked }));
    setSelectedDishes(updatedDishes);
    onChange?.(checked ? updatedDishes.map(d => d.name) : []);
  };

  const allChecked = selectedDishes.every(d => d.checked);
  const currentlySelected = selectedDishes.filter(d => d.checked);

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
            <HeartIcon className="w-8 h-8 stroke-2 text-green-600" />
            <span className="font-medium">Favourite Dish</span>
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
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Find Your Favorites</div>
              <div className="px-3 pb-2 text-sm text-neutral-600 dark:text-neutral-300">
                Search for specific dishes you love. Whether it's pizza, sushi, or curry, find restaurants that serve your favorite meals.
              </div>
              <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent px-3 pb-2">
                {currentlySelected.map((dish) => (
                  <div key={dish.name} className="flex items-center justify-between py-1 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="flex items-center gap-2">
                      <span>{dish.icon}</span>
                      <span>{dish.name}</span>
                    </span>
                    <button
                      onClick={(e) => handleTooltipDeselect(dish.name, e)}
                      className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"
                      aria-label={`Deselect ${dish.name}`}
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
                      name="select-all-dishes"
                      label="Select All Dishes"
                      labelClassName="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                      checked={allChecked}
                      onChange={handleSelectAll}
                    />
                  </div>

                  {/* Three Column Grid with Scrollbar - Updated */}
                  <div className="overflow-y-auto max-h-[234px] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                      {selectedDishes.map((dish) => (
                        <div
                          key={dish.name}
                          className="flex items-center justify-between p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 text-2xl">
                              {dish.icon}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {dish.name}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {dish.description}
                              </p>
                            </div>
                          </div>
                          <Checkbox
                            name={dish.name}
                            className="ml-auto flex-shrink-0"
                            checked={dish.checked}
                            onChange={(checked) => handleDishToggle(dish.name, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedDishes(dishes.map(d => ({ ...d, checked: false })));
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

export default FavouriteDishDropdown; 