"use client";

import React, { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  MapPinIcon,
  GlobeAsiaAustraliaIcon,
  SparklesIcon,
  UserGroupIcon,
  BoltIcon,
  FaceSmileIcon,
  HeartIcon,
  FireIcon,
  CakeIcon,
  StarIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import ButtonSubmit from "./ButtonSubmit";
import { useTimeoutFn } from "react-use";
import TabSpecificSearchForm from "./(real-estate-search-form)/TabSpecificSearchForm";
import TabsIndicator from "./TabsIndicator";

const TABS = [
  { name: "Near Me", icon: MapPinIcon, singleLine: true },
  { name: ["International", "Cuisines"], icon: GlobeAsiaAustraliaIcon },
  { name: ["Fine", "Dining"], icon: SparklesIcon },
  { name: ["Casual", "Dining"], icon: UserGroupIcon },
  { name: ["Fast", "Food"], icon: BoltIcon },
  { name: ["Child", "Friendly"], icon: FaceSmileIcon },
  { name: ["Favorite", "Foods"], icon: HeartIcon },
  { name: ["Healthy", "Foods"], icon: FireIcon },
  { name: ["Cafe &", "Coffee"], icon: CakeIcon },
  { name: ["Todays", "Special"], icon: StarIcon },
  { name: "Other", icon: EllipsisHorizontalIcon, singleLine: true }
];

// Function to get the tab name as a string
const getTabName = (tab: {name: string | string[], icon: any, singleLine?: boolean}): string => {
  if (Array.isArray(tab.name)) {
    return tab.name.join(' ');
  }
  return tab.name;
};

const HeroSearchForm2Mobile = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);

  useEffect(() => {
    const tabList = tabListRef.current;
    if (tabList) {
      const handleScroll = () => {
        const position = tabList.scrollLeft;
        const maximum = tabList.scrollWidth - tabList.clientWidth;
        setScrollPosition(position);
        setMaxScroll(maximum);
      };

      tabList.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => tabList.removeEventListener('scroll', handleScroll);
    }
  }, []);

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  // Handle form submission from TabSpecificSearchForm
  const handleSearchParamsChange = (params: Record<string, string>) => {
    setSearchParams(params);
  };

  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={openModal}
        className="relative flex items-center w-full border border-neutral-200 dark:border-neutral-6000 px-4 py-3 pr-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900 group"
      >
        <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />

        <div className="ml-3 flex-1 text-left overflow-hidden">
          <span className="block font-medium text-sm">What are you looking for?</span>
          <span className="block mt-0.5 text-xs font-light text-neutral-500 dark:text-neutral-400">
            <span className="line-clamp-1">
              View Your Meal Before You Order
            </span>
          </span>
        </div>

        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800 group-hover:bg-blue-50 dark:group-hover:bg-neutral-700 transition-colors duration-200">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="block w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
            fill="currentColor"
          >
            <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>
        </span>
        
        {/* Subtle pulse animation for the button */}
        <span className="absolute inset-0 rounded-full border border-blue-200 dark:border-blue-800 animate-pulse pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
    );
  };

  return (
    <div className="HeroSearchForm2Mobile">
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between">
                  {showDialog && (
                    <Tab.Group 
                      manual 
                      onChange={(index) => {
                        setActiveTabIndex(index);
                      }}
                    >
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>

                      <div className="pt-12 px-4">
                        <Tab.List ref={tabListRef} className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
                          {TABS.map((tab, index) => (
                            <Tab key={index} as={Fragment}>
                              {({ selected }) => (
                                <button
                                  className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl focus:outline-none text-sm transition-all duration-300
                                    flex flex-col items-center min-w-[76px] ${
                                    selected 
                                      ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-medium shadow-md transform scale-105"
                                      : "bg-neutral-200/70 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 hover:bg-neutral-300/70 dark:hover:bg-neutral-700"
                                    }`}
                                  style={{
                                    boxShadow: selected ? '0 4px 10px rgba(37, 99, 235, 0.25)' : 'none'
                                  }}
                                >
                                  <tab.icon className={`w-5 h-5 mb-1.5 transition-transform duration-200 ${selected ? 'scale-110' : ''}`} />
                                  {Array.isArray(tab.name) ? (
                                    <div className="text-center leading-tight">
                                      <div className="font-medium">{tab.name[0]}</div>
                                      <div>{tab.name[1]}</div>
                                    </div>
                                  ) : (
                                    <div className="font-medium">{tab.name}</div>
                                  )}
                                </button>
                              )}
                            </Tab>
                          ))}
                        </Tab.List>
                        <TabsIndicator 
                          scrollPosition={scrollPosition} 
                          maxScroll={maxScroll} 
                          totalDots={5}
                          onJumpToPosition={(position) => {
                            if (tabListRef.current) {
                              // Smooth scroll to the position
                              tabListRef.current.scrollTo({
                                left: position,
                                behavior: 'smooth'
                              });
                            }
                          }} 
                        />
                      </div>

                      <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                        <Tab.Panels className="flex-1 overflow-y-auto hiddenScrollbar py-4">
                          {TABS.map((tab, index) => (
                            <Tab.Panel key={index} className="focus:outline-none">
                              <div className="animate-[myblur_0.4s_ease-in-out] transform transition-all duration-300 ease-in-out">
                                <TabSpecificSearchForm 
                                  activeTab={getTabName(tab)} 
                                  onChange={handleSearchParamsChange}
                                />
                              </div>
                            </Tab.Panel>
                          ))}
                        </Tab.Panels>
                      </div>
                      <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                        <button
                          type="button"
                          className="underline font-semibold flex-shrink-0"
                          onClick={() => {
                            setShowDialog(false);
                            resetIsShowingDialog();
                          }}
                        >
                          Clear all
                        </button>
                        <ButtonSubmit
                          onClick={() => {
                            closeModal();
                          }}
                          searchParams={{
                            ...searchParams,
                            category: getTabName(TABS[activeTabIndex])
                          }}
                        />
                      </div>
                    </Tab.Group>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HeroSearchForm2Mobile;
