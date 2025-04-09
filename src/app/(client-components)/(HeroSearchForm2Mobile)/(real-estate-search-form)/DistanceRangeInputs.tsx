"use client";

import React, { useEffect, useState } from "react";
import { FC } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export interface DistanceRangeInputsProps {
  onChange?: (e: number[]) => void;
  defaultValue?: number[];
}

const getDistanceLabel = (distance: number) => {
  if (distance < 1000) {
    return `${distance}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
};

const sliderStyles = {
  track: {
    backgroundColor: '#2563eb', // bg-blue-600
    height: 4,
  },
  rail: {
    backgroundColor: '#e5e7eb', // bg-neutral-200
    height: 4,
  },
  handle: {
    borderColor: '#2563eb',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 2px #bfdbfe',
    opacity: 1,
    width: 18,
    height: 18,
    marginTop: -7,
  },
  dot: {
    borderColor: '#2563eb',
    borderWidth: 1,
    width: 8,
    height: 8,
    bottom: -3,
  },
  activeDot: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  }
};

const DistanceRangeInputs: FC<DistanceRangeInputsProps> = ({
  onChange,
  defaultValue,
}) => {
  // Convert km to meters for internal calculations
  const DEFAULT_DISTANCE = 15000; // 15km in meters
  const MAX_DISTANCE = 200000;    // 200km in meters
  
  const [rangeDistance, setRangeDistance] = useState(
    defaultValue || [0, DEFAULT_DISTANCE]
  );

  useEffect(() => {
    if (!defaultValue) return;
    setRangeDistance(defaultValue);
  }, [defaultValue]);

  // Generate marks for the slider with better formatting
  const generateMarks = () => {
    const marks: Record<number, React.ReactNode> = {
      0: <span className="text-xs font-medium mt-1">0</span>,
      50000: <span className="text-xs font-medium mt-1">50km</span>,
      100000: <span className="text-xs font-medium mt-1">100km</span>,
      150000: <span className="text-xs font-medium mt-1">150km</span>,
      200000: <span className="text-xs font-medium mt-1">200km</span>
    };
    return marks;
  };

  return (
    <div className="p-5">
      <span className="block font-semibold text-xl sm:text-2xl">
        Distance Range
      </span>
      <div className="relative flex flex-col space-y-8 mt-7">
        <div className="pt-2 pb-8">
          <Slider
            range
            min={0}
            max={MAX_DISTANCE}
            defaultValue={[rangeDistance[0], rangeDistance[1]]}
            allowCross={false}
            step={1000} // 1km steps
            onChange={(e) => {
              setRangeDistance(e as number[]);
              onChange && onChange(e as number[]);
            }}
            marks={generateMarks()}
            trackStyle={[sliderStyles.track]}
            railStyle={sliderStyles.rail}
            handleStyle={[sliderStyles.handle, sliderStyles.handle]}
            dotStyle={sliderStyles.dot}
            activeDotStyle={{
              ...sliderStyles.dot,
              ...sliderStyles.activeDot
            }}
          />
        </div>

        <div className="flex justify-between space-x-3">
          <div className="flex-1">
            <label
              htmlFor="minDistance"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Min distance
            </label>
            <div className="mt-1 relative rounded-md">
              <input
                type="text"
                disabled
                name="minDistance"
                id="minDistance"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full px-4 sm:text-sm border-neutral-200 rounded-full text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-white"
                value={getDistanceLabel(rangeDistance[0])}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxDistance"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Max distance
            </label>
            <div className="mt-1 relative rounded-md">
              <input
                disabled
                type="text"
                name="maxDistance"
                id="maxDistance"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full px-4 sm:text-sm border-neutral-200 rounded-full text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-white"
                value={getDistanceLabel(rangeDistance[1])}
              />
            </div>
          </div>
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          {rangeDistance[0] === 0 
            ? `Showing restaurants within ${getDistanceLabel(rangeDistance[1])} of your location`
            : `Showing restaurants between ${getDistanceLabel(rangeDistance[0])} and ${getDistanceLabel(rangeDistance[1])} from your location`
          }
        </div>
      </div>
    </div>
  );
};

export default DistanceRangeInputs;
