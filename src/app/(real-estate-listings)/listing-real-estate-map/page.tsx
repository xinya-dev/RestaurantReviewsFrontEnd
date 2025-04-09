import React, { FC } from "react";
import SectionGridHasMap from "../SectionGridHasMap";
import SectionHeroListing from "@/app/(server-components)/SectionHeroListing";
import BgGlassmorphism from "@/components/BgGlassmorphism";

export interface ListingRealEstateMapPageProps {}

const ListingRealEstateMapPage: FC<ListingRealEstateMapPageProps> = ({}) => {
  return (
    <>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />
      
      {/* SECTION HERO */}
      {/* <div className="container relative">
        <SectionHeroListing className="pt-10 lg:pt-16 lg:pb-16" />
      </div> */}
      
      {/* MAP & RESULTS SECTION */}
      <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none mt-4 lg:mt-16">
        <SectionGridHasMap />
      </div>
    </>
  );
};

export default ListingRealEstateMapPage;
