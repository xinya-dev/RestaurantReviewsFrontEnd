import { type FC } from "react";
import RRSearchForm from "../(client-components)/(HeroSearchForm)/RRSearchForm";
import SpecialOffersSlideshow from "../(client-components)/SpecialOffersSlideshow";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionHero relative pt-6 lg:pt-8 ${className}`}>
      {/* Background Image */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/restaurant7.png"
          alt="Restaurant ambiance"
          fill
          className="object-cover opacity-95"
          priority
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto">
        <div className="flex gap-8">
          {/* Main Content Column - 75% - Hidden on mobile */}
          <div className="hidden md:block flex-1">
            <div className="flex-shrink-0 pb-14 lg:pb-8 xl:pr-14 lg:mr-10 xl:mr-0 text-center">
              <h3 className="font-medium text-3xl md:text-4xl xl:text-4xl leading-none text-center text-neutral-900 dark:text-white">
              “View your meal before you order it”
              </h3>
              <span className="block mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
              Find your Favorite Food & Restaurants in your Area

              </span>
            </div>
            <div className="max-w-7xl mx-auto mt-0">
              <RRSearchForm />
            </div>
          </div>

          {/* Slideshow Column - 25% on web, full width on mobile */}
          {/* <div className="w-full md:w-1/4 relative">
            <SpecialOffersSlideshow />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
