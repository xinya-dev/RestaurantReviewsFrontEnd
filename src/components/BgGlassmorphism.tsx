import React, { FC } from "react";
import Image from "next/image";
export interface BgGlassmorphismProps {
  className?: string;
  image?: string;
  spanClassName?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = "absolute inset-x-0 md:top- xl:top- min-h- max-h-200 pl-20 py-24 flex overflow-hidden z-0 h-180 ",
  image = "/images/banner4.jpg",
  spanClassName = "hidden",
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className} h-180`}
      data-nc-id="BgGlassmorphism"
    > <Image src={image} alt="Restaurant ambiance" fill className="object-cover h-180 max-h-196 h-180" priority />
    
      <span className={`block bg-[#ef233c] w-72 h-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-80 ${spanClassName}`}></span>
      {/* <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span> */}
    </div>
  );
};

export default BgGlassmorphism;
