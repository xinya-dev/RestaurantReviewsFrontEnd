import React, { FC } from "react";
import Image from "next/image";
export interface BgGlassmorphismProps {
  className?: string;
  image?: string;
  spanClassName?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = "absolute inset-x-0 md:top- xl:top- min-h- max-h-200  py-80 flex overflow-hidden z-0 h-100 ",
  image = "/images/banner-white.jpeg",
  spanClassName = "hidden",
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className} `}
      data-nc-id="BgGlassmorphism"
    > <Image src={image} alt="Restaurant ambiance" fill className="object-cover h-180 max-h-196 h-180" priority />
    
      <span className={`block bg-[#ef233c] w-72 h-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-80 ${spanClassName}`}></span>
      {/* <span className="block bg-[#04868b] w-72 h-50 ml-20  rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span> */}
    </div>
  );
};

export default BgGlassmorphism;
