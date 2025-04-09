"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const specialOffers = [
  {
    id: 1,
    image: "/images/restaurant10.jpg",
    title: "50% Off First Order",
    description: "Exclusive discount for new customers"
  },
  {
    id: 2,
    image: "/images/restaurant2.jpg",
    title: "Family Weekend Special",
    description: "Special deals for family gatherings"
  },
  {
    id: 3,
    image: "/images/restaurant9.jpg",
    title: "Happy Hours 3-6 PM",
    description: "20% off on all menu items"
  },
  {
    id: 4,
    image: "/images/restaurant4.jpg",
    title: "Lunch Combo Deals",
    description: "Complete meal starting from $12.99"
  },
  {
    id: 5,
    image: "/images/restaurant5.jpg",
    title: "Chef's Special Menu",
    description: "Exclusive gourmet selections every weekend"
  },
  {
    id: 6,
    image: "/images/restaurant8.jpg",
    title: "Student Discount",
    description: "15% off with valid student ID"
  }
];

const SpecialOffersSlideshow: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  // Auto-advance slides with smoother transition
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % specialOffers.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="bg-white dark:bg-neutral-800 overflow-hidden">
      {/* Slideshow */}
      <div className="relative h-[500px]">
        <Image
          src={specialOffers[currentSlide].image}
          alt="Special offer"
          fill
          className={`object-cover transition-all duration-700 ease-in-out ${
            isTransitioning ? 'opacity-60 scale-105' : 'opacity-100 scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Navigation Buttons */}
        <button
          onClick={() => handleSlideChange((currentSlide - 1 + specialOffers.length) % specialOffers.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 duration-300"
        >
          <ChevronLeftIcon className="h-6 w-6 text-neutral-700" />
        </button>
        <button
          onClick={() => handleSlideChange((currentSlide + 1) % specialOffers.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 duration-300"
        >
          <ChevronRightIcon className="h-6 w-6 text-neutral-700" />
        </button>

        {/* Text Content - Positioned at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h3 className="text-2xl font-bold mb-2">
            {specialOffers[currentSlide].title}
          </h3>
          <p className="text-white/90 text-lg">
            {specialOffers[currentSlide].description}
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {specialOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentSlide === index 
                ? "w-6 bg-white" 
                : "bg-white/75 hover:bg-white/85"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersSlideshow; 