import React, { FC } from "react";
import Image from "next/image";
export interface BgGlassmorphismProps {
  className?: string;
  image?: string;
  spanClassName?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = "absolute inset-x-0 top-0 h-[1000px] overflow-hidden",
  image = "/images/banner-white.jpeg",
  spanClassName = "hidden",
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className}`}
      data-nc-id="BgGlassmorphism"
    > 
      <div className="absolute inset-0">
        <Image 
          src={image} 
          alt="Restaurant ambiance" 
          fill 
          className="object-cover object-center"
          priority 
        />
      </div>
    
      <span className={`block bg-[#ef233c] w-72 h-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-80 ${spanClassName}`}></span>
      <span className="block bg-[#04868b] w-72 h-50 ml-20  rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
    </div>
  );
};

export default BgGlassmorphism;
