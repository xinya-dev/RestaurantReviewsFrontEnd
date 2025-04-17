"use client";

import React, { FC, useRef, useState } from "react";
import Logo from "@/shared/Logo";
import { SearchTab } from "../(HeroSearchForm)/RRSearchForm";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Navigation from "@/shared/Navigation/Navigation";

interface Header3Props {
  className?: string;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  // const [currentTab, setCurrentTab] = useState<SearchTab>("Near Me");

  const handleShowHeroSearch = (tab: SearchTab) => {
    // setCurrentTab(tab);
    setShowSearchForm(true);
  };

  const handleCloseSearch = () => {
    setShowSearchForm(false);
  };

  const handleTabClick = (tab: SearchTab) => {
    // setCurrentTab(tab);
    setShowSearchForm(true);
  };

  const handleSearchClick = ()       => {
    handleShowHeroSearch("Dine In");
  };

  const renderTab = () => {
    return (
      <ul className="ml-6 md:ml-10 flex space-x-4 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
        {["Dine In", "Take Away", "Child Friendly"].map(
          (tab) => {
            // const active = currentTab === tab;
            return (
              <li
                onClick={() => handleTabClick(tab as SearchTab)}
                // className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                //   // active
                //   //   ? ""
                //   //   : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
                // } `}
                key={tab}
              >
                {tab}
              </li>
            );
          }
        )}
      </ul>
    );
  };

  const renderMainNav = () => {
    return (
      <div className="hidden lg:flex">
        <div className="relative">
          <div
            className="cursor-pointer py-2 px-4 flex items-center space-x-3 rounded-full border border-neutral-300 focus:outline-none hover:border-neutral-400 "
            onClick={handleSearchClick}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span className="text-neutral-500 dark:text-neutral-400">Search</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSearchForm = () => {
    return (
      <div
        className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${
          showSearchForm ? "visible" : "invisible"
        }`}
      >
        <div className="w-full">
          <div className="container">
            <div className="flex justify-between">
              <HeroSearchForm2MobileFactory />
              <div
                className="flex items-center justify-center"
                onClick={handleCloseSearch}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer">
                  <XMarkIcon className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className={`sticky top-0 z-40 ${className}`}>
      <div className="relative px-4 lg:container h-[88px] flex">
        <div className="flex-1 flex justify-between">
          {/* Logo (lg+) */}
          <div className="relative z-10 hidden md:flex flex-1 items-center">
            <Logo />
          </div>

          <div className="flex flex-[2] lg:flex-none mx-auto">
            <div className="flex-1 hidden lg:flex self-center">
              {renderSearchForm()}
            </div>
          </div>

          {/* NAV */}
          <div className="hidden md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
            <div className="flex space-x-1">
              <Navigation />
            </div>
          </div>

          {renderMainNav()}
        </div>
      </div>
    </header>
  );
};

export default Header3;
