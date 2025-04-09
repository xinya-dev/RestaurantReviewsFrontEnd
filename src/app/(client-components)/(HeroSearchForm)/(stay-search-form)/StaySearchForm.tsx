import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import ButtonSubmit from "../ButtonSubmit";

interface StaySearchFormProps {
  currentTab?: string;
}

const StaySearchForm: FC<StaySearchFormProps> = ({ currentTab = "Near Me" }) => {
  // Use state to collect search parameters
  const [searchParams, setSearchParams] = useState<Record<string, string>>({
    category: currentTab
  });

  // Update search parameters
  const updateSearchParams = (params: Record<string, string>) => {
    setSearchParams(prev => ({
      ...prev,
      ...params
    }));
  };

  // Monitor form input changes
  const handleLocationChange = () => {
    // This will be handled by capturing the input value directly from the form
    // in a real implementation
    updateSearchParams({ query: "Sample location" });
  };

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <LocationInput className="flex-[1.5]" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <StayDatesRangeInput className="flex-1" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput className="flex-1" />
        <div className="flex items-center pr-2">
          <ButtonSubmit searchParams={{ ...searchParams, category: currentTab }} />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
