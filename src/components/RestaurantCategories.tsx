import React, { FC } from "react";
import { TaxonomyType, RestaurantTypeTabs } from "@/data/types";
import Badge from "@/shared/Badge";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";

export interface RestaurantCategoriesProps {
  className?: string;
  taxonomy: RestaurantTypeTabs;
  isSelected?: boolean;
}

const RestaurantCategories: FC<RestaurantCategoriesProps> = ({
  className = "",
  taxonomy,
  isSelected = false,
}) => {
  const { name, icon } = taxonomy;
  return (
    <div 
      className={`relative flex  items-center justify-center p-2  ${className}`}
    >
      {/* <Badge
        className="absolute right-2 top-2"
        color="blue"
        name={convertNumbThousand(100)}
      /> */}

      <div className="flex-shrink-0 flex items-center justify-center  ">
        {icon}
      </div>
      
      <h2 className={`text-sm font-medium text-center ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
        {name}
      </h2>
    </div>
  );
};

export default RestaurantCategories;
