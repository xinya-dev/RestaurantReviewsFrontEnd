import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import { DEMO_STAY_CATEGORIES } from "@/data/taxonomies";
import { DEMO_AUTHORS } from "@/data/authors";

// RESTAURANT DEMO DATA
const RESTAURANT_DEMO_DATA: StayDataType[] = [
  {
    id: "rest1",
    author: DEMO_AUTHORS[0],
    date: "May 20, 2023",
    href: "/listing-stay",
    title: "La Bella Italia",
    featuredImage: "/images/restaurant2.jpg",
    commentCount: 48,
    viewCount: 9212,
    address: "123 Pasta Street • 1.2 km away",
    reviewStart: 4.8,
    reviewCount: 128,
    like: true,
    galleryImgs: [
      "/images/restaurant2.jpg",
      "/images/restaurant3.jpg",
      "/images/restaurant4.jpg",
    ],
    price: "$$",
    listingCategory: {
      ...DEMO_STAY_CATEGORIES[0],
      name: "Italian"
    },
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    saleOff: "",
    isAds: false,
    map: { lat: 40.7, lng: -74 }
  },
  {
    id: "rest2",
    author: DEMO_AUTHORS[1],
    date: "May 20, 2023",
    href: "/listing-stay",
    title: "Sushi Master",
    featuredImage: "/images/restaurant5.jpg",
    commentCount: 56,
    viewCount: 7425,
    address: "45 Sushi Lane • 2.5 km away",
    reviewStart: 4.9,
    reviewCount: 189,
    like: false,
    galleryImgs: [
      "/images/restaurant5.jpg",
      "/images/restaurant6.jpg",
      "/images/restaurant7.jpg",
    ],
    price: "$$$",
    listingCategory: {
      ...DEMO_STAY_CATEGORIES[0],
      name: "Japanese"
    },
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    saleOff: "",
    isAds: false,
    map: { lat: 40.7, lng: -74 }
  },
  {
    id: "rest3",
    author: DEMO_AUTHORS[2],
    date: "May 20, 2023",
    href: "/listing-stay",
    title: "Spice Garden",
    featuredImage: "/images/restaurant8.jpg",
    commentCount: 62,
    viewCount: 6128,
    address: "78 Curry Road • 0.8 km away",
    reviewStart: 4.7,
    reviewCount: 245,
    like: true,
    galleryImgs: [
      "/images/restaurant8.jpg",
      "/images/restaurant9.jpg",
      "/images/restaurant10.jpg",
    ],
    price: "$$",
    listingCategory: {
      ...DEMO_STAY_CATEGORIES[0],
      name: "Indian"
    },
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    saleOff: "",
    isAds: false,
    map: { lat: 40.7, lng: -74 }
  },
  {
    id: "rest4",
    author: DEMO_AUTHORS[3],
    date: "May 20, 2023",
    href: "/listing-stay",
    title: "Le Petit Bistro",
    featuredImage: "/images/restaurant11.jpg",
    commentCount: 44,
    viewCount: 5285,
    address: "92 French Quarter • 3.1 km away",
    reviewStart: 4.6,
    reviewCount: 156,
    like: false,
    galleryImgs: [
      "/images/restaurant11.jpg",
      "/images/restaurant12.jpg",
      "/images/restaurant13.jpg",
    ],
    price: "$$$",
    listingCategory: {
      ...DEMO_STAY_CATEGORIES[0],
      name: "French"
    },
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    saleOff: "",
    isAds: false,
    map: { lat: 40.7, lng: -74 }
  }
];

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = RESTAURANT_DEMO_DATA,
  gridClass = "",
  heading = "Suggestions for discovery",
  subHeading = "Popular restaurants recommended for you",
  headingIsCenter,
  tabs = ["All Cuisines", "Italian", "Japanese", "Indian", "French"],
  cardType = "card2",
}) => {
  const renderCard = (stay: StayDataType) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;
      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"All Cuisines"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {stayListings.map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
