import React, { FC, ReactNode } from "react";
import imagePng from "@/images/hero-right2.png";
import RRSearchForm, {
  SearchTab,
} from "../(client-components)/(HeroSearchForm)/RRSearchForm";
import Image, { StaticImageData } from "next/image";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: SearchTab;
  currentTab: SearchTab;
  rightImage?: StaticImageData;
  defaultSearchText?: string;
  defaultSearchDistance?: string;
  defaultSelectedItems?: string[];
  tabClassName?: string;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
  defaultSearchText,
  defaultSearchDistance,
  defaultSelectedItems,
  tabClassName,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className} mt-40`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            Tokyo, Jappan
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-map-marked"></i>
            <span className="ml-2.5">Jappan </span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 properties</span>
              </>
            )}
          </div>
        </div> */}
        {/* <div className="flex-grow">
          <Image
            className="w-full"
            src={rightImage}
            alt="hero"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div> */}
        <div className="hidden lg:flow-root w-full">
          <div className="z-10 lg:-mt-40 xl:-mt-70 w-full">
            <RRSearchForm 
              currentPage={currentPage} 
              currentTab={currentTab} 
              defaultSearchText={defaultSearchText} 
              defaultSearchDistance={defaultSearchDistance} 
              defaultSelectedItems={defaultSelectedItems} 
              tabClassName={tabClassName}
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SectionHeroArchivePage;
