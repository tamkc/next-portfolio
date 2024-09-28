import React from "react";
import Image from "next/image";

interface TechCardProps {
  title: string;
  imgSrc: string;
}

const TechCard: React.FC<TechCardProps> = ({ title, imgSrc }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden w-28 h-36 mx-auto transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      {/* Animation: scale and shadow change on hover */}
      <div className="flex items-center justify-center p-4">
        <div className=" w-16 h-16 relative">
          {/* Fixed size container for the image */}
          <Image
            src={imgSrc}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        </div>
      </div>
      <div className="bg-transparent p-4 text-center">
        <p className="text-md font-semibold text-gray-800 truncate">{title}</p>
      </div>
    </div>
  );
};

export default TechCard;
