"use client";

import React, { useEffect, useState } from 'react';
import { MapPinIcon } from "@heroicons/react/24/outline";

interface LocationDetails {
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

interface CurrentLocationDisplayProps {
  className?: string;
}

const CurrentLocationDisplay: React.FC<CurrentLocationDisplayProps> = ({ className = "" }) => {
  const [location, setLocation] = useState<LocationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Try to get address using reverse geocoding with better parameters
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?` + 
                `format=json&lat=${latitude}&lon=${longitude}&` +
                `zoom=10&addressdetails=1&accept-language=en`
              );
              const data = await response.json();
              
              // Extract relevant address components
              const address = data.address || {};
              setLocation({
                lat: latitude,
                lng: longitude,
                city: address.city || address.town || address.village || address.suburb,
                state: address.state,
                postcode: address.postcode,
                country: address.country
              });
            } catch (error) {
              // If reverse geocoding fails, just show coordinates
              setLocation({
                lat: latitude,
                lng: longitude
              });
            }
            
            setLoading(false);
          } catch (error) {
            setError("Failed to get location details");
            setLoading(false);
          }
        },
        (error) => {
          setError("Please enable location access");
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 text-sm text-neutral-500 ${className}`}>
        <MapPinIcon className="w-4 h-4 animate-pulse" />
        <span>Getting your location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center gap-2 text-sm text-neutral-500 ${className}`}>
        <MapPinIcon className="w-4 h-4" />
        <span>{error}</span>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className={`flex items-center gap-2 text-sm text-neutral-600 ${className}`}>
      <MapPinIcon className="w-7 h-7  text-indigo-600 font-bold bg-white rounded-full " />
      <span className="truncate text-gray-600">
        {location.city ? 
          `${location.city}${location.state ? `, ${location.state}` : ''}${location.postcode ? ` ${location.postcode}` : ''}${location.country ? `, ${location.country}` : ''}` 
          : 
          `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
        }
      </span>
    </div>
  );
};

export default CurrentLocationDisplay; 