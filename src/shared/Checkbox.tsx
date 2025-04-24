"use client";

import React, { FC, ReactNode } from "react";

export interface CheckboxProps {
  label?: ReactNode;
  subLabel?: string;
  className?: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelClassName?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  checked = false,
  onChange,
  labelClassName = "",
}) => {
  return (
    <div className={`flex text-sm sm:text-base ${className}  `}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500 "
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="ml-3.5 flex flex-col flex-1 justify-center "
        >
          <span className={` dark:text-neutral-100 ${labelClassName} `}>
            {label}
          </span>
          {/* {subLabel && (
            <p className={`t-1 text-white dark:text-neutral-400 text-sm font-light  `}>
              {subLabel}
            </p>
          )} */}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
