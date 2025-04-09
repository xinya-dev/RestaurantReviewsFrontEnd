import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = "/images/restaurant3.jpg",
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image 
          src={rightImg} 
          alt="Restaurant reviews and features" 
          className="rounded-2xl object-cover"
          width={650}
          height={500}
          priority
        />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          DISCOVER & DINE
        </span>
        <h2 className="font-semibold text-4xl mt-5">Find Perfect Restaurants</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Reviews" />
            <span className="block text-xl font-semibold">
              Trusted Reviews & Ratings
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Access authentic reviews and ratings from real diners to make informed dining decisions
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Search" />
            <span className="block text-xl font-semibold">
              Smart Restaurant Search
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Find restaurants by cuisine, location, dietary preferences, and special amenities
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Features" />
            <span className="block text-xl font-semibold">
              Complete Restaurant Info
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              View menus, photos, operating hours, special offers, and make instant table reservations
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;