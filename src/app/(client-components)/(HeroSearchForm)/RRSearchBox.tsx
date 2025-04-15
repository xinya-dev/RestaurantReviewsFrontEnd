"use client";

import { ClockIcon, MapPinIcon, MagnifyingGlassIcon, MapPinIcon as LocationMarkerIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";

interface LocationData {
  postcode: string;
  locality: string;
  state: string;
}

interface LocationGroup {
  locality: string;
  locations: LocationData[];
  isSelected: boolean;
}

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onMultiSelect?: (locations: LocationData[]) => void;
  initialValue?: string;
}

const MAX_RECENT_SEARCHES = 4;
const RECENT_SEARCHES_KEY = 'recentLocationSearches';

const RRSearchBox: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Type town, postcode or state to search",
  desc = "Enter your location to find nearby restaurants",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  onChange,
  initialValue = "",
  onMultiSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>([]);
  const [value, setValue] = useState(initialValue);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevValueRef = useRef(value);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<LocationData[]>([]);
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [recentSearches, setRecentSearches] = useState<LocationData[]>([]);

  // Load and parse the CSV data
  useEffect(() => {
    const loadLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching CSV data...');
        const response = await fetch('/australian_postcodes.csv');
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        console.log('CSV data received, first 100 chars:', text.substring(0, 100));
        const lines = text.trim().split('\n');
        console.log(`Found ${lines.length} lines in CSV`);
        if (lines.length <= 1) {
          throw new Error('CSV file is empty or contains only headers');
        }
        const data = lines.slice(1).map(line => {
          const [postcode, locality, state] = line.split(',').map(item => item.trim());
          return { postcode, locality, state };
        });
        console.log(`Parsed ${data.length} locations`);
        console.log('Sample location:', data[0]);
        setLocations(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading locations:', error);
        setError(error instanceof Error ? error.message : 'Failed to load locations');
        setIsLoading(false);
      }
    };
    loadLocations();
  }, []);

  // Filter locations based on search input
  useEffect(() => {
    if (value.trim()) {
      const searchTerm = value.toLowerCase().trim();
      console.log('Filtering locations for:', searchTerm);
      
      // More flexible search that handles partial matches
      const filtered = locations.filter(location => {
        const localityMatch = location.locality.toLowerCase().includes(searchTerm);
        const postcodeMatch = location.postcode.includes(searchTerm);
        const stateMatch = location.state.toLowerCase().includes(searchTerm);
        
        // For exact suburb names, prioritize them
        if (location.locality.toLowerCase() === searchTerm) {
          return true;
        }
        
        // For partial matches, ensure the match is at the start of a word
        if (localityMatch) {
          const words = location.locality.toLowerCase().split(' ');
          return words.some(word => word.startsWith(searchTerm));
        }
        
        return postcodeMatch || stateMatch;
      });

      // Add currently selected locations to the filtered results if they're not already included
      selectedLocations.forEach(selected => {
        const isAlreadyInFiltered = filtered.some(
          loc => loc.postcode === selected.postcode && loc.locality === selected.locality
        );
        if (!isAlreadyInFiltered) {
          filtered.unshift(selected);
        }
      });

      console.log(`Found ${filtered.length} matches for "${searchTerm}"`);
      setFilteredLocations(filtered.slice(0, 10));
    } else {
      setFilteredLocations([]);
    }
  }, [value, locations, selectedLocations]);

  // Update location groups when filtered locations change
  useEffect(() => {
    if (value.trim()) {
      const groups = filteredLocations.reduce((acc: { [key: string]: LocationData[] }, location) => {
        if (!acc[location.locality]) {
          acc[location.locality] = [];
        }
        acc[location.locality].push(location);
        return acc;
      }, {});

      const groupArray = Object.entries(groups).map(([locality, locations]) => ({
        locality,
        locations,
        isSelected: locations.some(loc => 
          selectedLocations.some(selected => 
            selected.postcode === loc.postcode && 
            selected.locality === loc.locality
          )
        )
      }));

      setLocationGroups(groupArray);
    } else {
      setLocationGroups([]);
    }
  }, [filteredLocations, selectedLocations]);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    if (prevValueRef.current !== value && onChange) {
      onChange(value);
      prevValueRef.current = value;
    }
  }, [value, onChange]);

  // Add effect to check if dropdown would go out of view
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - containerRect.bottom;
        const spaceAbove = containerRect.top;
        const dropdownHeight = 280; // Reduced max height of dropdown

        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    if (showPopover) {
      updatePosition();
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (location: LocationData) => {
    const formattedLocation = `${location.locality} (${location.postcode}, ${location.state})`;
    setValue(formattedLocation);
    setShowPopover(false);
    if (onChange) {
      onChange(formattedLocation);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const form = (e.target as HTMLElement).closest('form');
      if (form) {
        if (onChange) {
          onChange(value);
        }
        
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Error loading recent searches:', e);
        setRecentSearches([]);
      }
    }
  }, []);

  // Add a search to recent searches
  const addToRecentSearches = (location: LocationData) => {
    setRecentSearches(prevSearches => {
      // Remove if already exists
      const filteredSearches = prevSearches.filter(
        item => !(item.postcode === location.postcode && item.locality === location.locality)
      );
      
      // Add to beginning and keep only MAX_RECENT_SEARCHES items
      const newSearches = [location, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
      
      // Save to localStorage
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      
      return newSearches;
    });
  };

  const handleLocationSelect = (location: LocationData, e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const isSelected = selectedLocations.some(
      selected => selected.postcode === location.postcode && selected.locality === location.locality
    );

    if (isSelected) {
      // Clear everything on deselection
      setSelectedLocations([]);
      setValue("");
      if (onChange) onChange("");
      if (onMultiSelect) onMultiSelect([]);
    } else {
      // Select new location
      setSelectedLocations([location]);
      setValue(`${location.locality} (${location.postcode}, ${location.state})`);
      addToRecentSearches(location);
      if (onChange) onChange(`${location.locality} (${location.postcode}, ${location.state})`);
      if (onMultiSelect) onMultiSelect([location]);
    }
  };

  // Reset selected locations when input value changes
  useEffect(() => {
    if (!value.trim()) {
      setSelectedLocations([]);
    }
  }, [value]);

  const handleGroupSelect = (group: LocationGroup) => {
    const isSelected = group.isSelected;
    let newSelectedLocations: LocationData[];

    if (isSelected) {
      // Remove all locations from this group
      newSelectedLocations = selectedLocations.filter(
        selected => !group.locations.some(loc => 
          loc.postcode === selected.postcode && loc.locality === selected.locality
        )
      );
    } else {
      // Add all locations from this group
      const existingLocations = new Set(
        selectedLocations.map(loc => `${loc.locality}-${loc.postcode}`)
      );
      newSelectedLocations = [
        ...selectedLocations,
        ...group.locations.filter(
          loc => !existingLocations.has(`${loc.locality}-${loc.postcode}`)
        )
      ];
    }

    setSelectedLocations(newSelectedLocations);
    if (onMultiSelect) {
      onMultiSelect(newSelectedLocations);
    }

    // Update the input value
    if (newSelectedLocations.length > 0) {
      const firstLocation = newSelectedLocations[0];
      setValue(`${firstLocation.locality} (${firstLocation.postcode}, ${firstLocation.state})`);
    } else {
      setValue("");
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.address) {
            const { postcode, city, town, village, state } = data.address;
            const locality = city || town || village || '';
            
            // Create a LocationData object for the current location
            const locationData: LocationData = {
              locality,
              postcode: postcode || '',
              state: state || ''
            };

            // Add to recent searches
            addToRecentSearches(locationData);

            // Update the input value
            const formattedLocation = `${locality} (${postcode}, ${state})`;
            setValue(formattedLocation);
            if (onChange) {
              onChange(formattedLocation);
            }

            // Set as selected location
            setSelectedLocations([locationData]);
            if (onMultiSelect) {
              onMultiSelect([locationData]);
            }
          }
        } catch (error) {
          console.error('Error getting location details:', error);
          alert('Could not get location details. Please try again.');
        } finally {
          setIsGettingLocation(false);
          setShowPopover(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Could not get your location. Please try again or enter manually.');
        setIsGettingLocation(false);
      }
    );
  };

  const renderRecentSearches = () => {
    if (recentSearches.length === 0) {
      return (
        <div className="px-4 sm:px-8 py-4 text-neutral-500">
          No recent searches
        </div>
      );
    }

    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <div className="mt-2">
          {recentSearches.map((location) => (
            <span
              onClick={() => handleLocationSelect(location, new Event('click') as any)}
              key={`${location.postcode}-${location.locality}`}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                {location.locality} ({location.postcode}, {location.state})
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderSearchValue = () => {
    if (isLoading) {
      return (
        <div className="px-4 sm:px-8 py-4 text-neutral-500">
          Loading locations...
        </div>
      );
    }

    if (error) {
      return (
        <div className="px-4 sm:px-8 py-4 text-red-500">
          Error: {error}
        </div>
      );
    }

    return (
      <>
        {/* Current Location Button */}
        <div
          onClick={getCurrentLocation}
          className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer border-b border-neutral-200 dark:border-neutral-700"
        >
          <span className="block text-primary-600 dark:text-primary-400">
            <LocationMarkerIcon className="h-4 w-4 sm:h-6 sm:w-6" />
          </span>
          <span className="block font-medium text-neutral-700 dark:text-neutral-200">
            {isGettingLocation ? "Getting your location..." : "Use current location"}
          </span>
        </div>

        {/* Show Recent Searches when no search term */}
        {!value.trim() && renderRecentSearches()}

        {/* Show search results when there's a search term */}
        {value.trim() && (
          <>
            {filteredLocations.length === 0 ? (
              <div className="px-4 sm:px-8 py-4 text-neutral-500">
                No locations found
              </div>
            ) : (
              <>
                {/* Matching items count */}
                <div className="px-4 sm:px-8 py-2 text-sm text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                  {filteredLocations.length} {filteredLocations.length === 1 ? 'location' : 'locations'} found
                </div>

                {filteredLocations.map((location) => (
                  <div
                    key={`${location.postcode}-${location.locality}`}
                    className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                    onClick={(e) => handleLocationSelect(location, e)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLocations.some(
                        selected => selected.postcode === location.postcode && selected.locality === location.locality
                      )}
                      onChange={(e) => handleLocationSelect(location, e)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <span className="block text-neutral-400">
                      <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </span>
                    <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                      {location.locality} ({location.postcode}, {location.state})
                    </span>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </>
    );
  };

  const handleMainClick = () => {
    setShowPopover(true);
    setIsTooltipVisible(false); // Hide tooltip on click
  };

  return (
    <div className={`relative flex ${className} `} ref={containerRef}>
      <div
        onClick={handleMainClick}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left group${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        {/* Tooltip */}
        <div
          className={`absolute transition-opacity bottom-full left-0 mb-2 px-4 py-2 bg-white dark:bg-neutral-800 text-sm rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 whitespace-nowrap ${
            isTooltipVisible ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className="font-medium text-neutral-900 dark:text-neutral-100">{placeHolder}</div>
          <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">{desc}</div>
          {value && (
            <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <div className="text-primary-600 dark:text-primary-400 font-medium">Search Term:</div>
              <div className="text-neutral-700 dark:text-neutral-300">{value}</div>
            </div>
          )}
          {/* Arrow */}
          <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>

        <div className="text-neutral-300 dark:text-neutral-400">
          <MagnifyingGlassIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200  truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue("");
                if (onChange) {
                  onChange("");
                }
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className={`absolute left-0 z-40 w-full min-w-[400px] sm:min-w-[600px] bg-white dark:bg-neutral-800 h-[230px] ${
          dropdownPosition === 'top' 
            ? 'bottom-full mb-3' 
            : 'top-full mt-3'
        } py-2 sm:py-4 rounded-3xl shadow-xl max-h-[280px]`}>
          {/* Inner scrollable container */}
          <div className="h-full overflow-y-auto py-2 sm:py-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
            {renderSearchValue()}
          </div>
        </div>
      )}
    </div>
  );
};

export default RRSearchBox;
