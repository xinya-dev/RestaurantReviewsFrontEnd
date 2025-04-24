import React, { FC } from "react";
import Checkbox from "@/shared/Checkbox";

export interface PageAddListing4Props {}

const PageAddListing4: FC<PageAddListing4Props> = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodation based on amenities
          criteria
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            General amenities
          </label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Wifi" name="Wifi" checked />
            <Checkbox label="Internet" name="Internet" />
            <Checkbox label="TV" name="TV" checked />
            <Checkbox label="Air conditioning" name="Air conditioning" />
            <Checkbox label="Fan" name="Fan" checked />
            <Checkbox label="Private entrance" name="Private entrance" />
            <Checkbox label="Dryer" name="Dryer" checked />
            <Checkbox label="Heater" name="Heater" />
            <Checkbox label="Washing machine" name="Washing machine" />
            <Checkbox label="Detergent" name="Detergent" checked />
            <Checkbox label="Clothes dryer" name="Clothes dryer" />
            <Checkbox label="Baby cot" name="Baby cot" />
            <Checkbox label="Desk" name="Desk " checked />
            <Checkbox label="Fridge" name="Fridge" />
            <Checkbox label="Dryer" name="Dryer" checked />
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Other amenities
          </label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Wardrobe" name="Wardrobe" checked />
            <Checkbox label="Cloth hook" name="Cloth hook" />
            <Checkbox label="Extra cushion" name="Extra cushion" checked />
            <Checkbox label="Gas stove" name="Gas stove" />
            <Checkbox label="Toilet paper" name="Toilet paper" />
            <Checkbox label="Free toiletries" name="Free toiletries" checked />
            <Checkbox label="Makeup table" name="Makeup table" />
            <Checkbox label="Hot pot" name="Hot pot" />
            <Checkbox label="Bathroom heaters" name="Bathroom heaters" />
            <Checkbox label="Kettle" name="Kettle" checked />
            <Checkbox label="Dishwasher" name="Dishwasher" checked />
            <Checkbox label="BBQ grill" name="BBQ grill" checked />
            <Checkbox label="Toaster" name="Toaster" checked />
            <Checkbox label="Towel" name="Towel" />
            <Checkbox label="Dining table" name="Dining table" />
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Safe amenities
          </label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Fire siren" name="Fire siren" checked />
            <Checkbox label="Fire extinguisher" name="Fire extinguisher" />
            <Checkbox label="Anti-theft key" name="Anti-theft key" checked />
            <Checkbox label="Safe vault" name="Safe vault" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing4;
