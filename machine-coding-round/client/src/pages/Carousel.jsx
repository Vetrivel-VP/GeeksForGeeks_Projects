import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Carousel = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2022/11/22/20/25/ball-7610545_640.jpg",
    "https://cdn.pixabay.com/photo/2023/04/13/17/08/forest-7922999_640.jpg",
    "https://cdn.pixabay.com/photo/2017/08/07/00/24/sea-2597926_1280.jpg",
  ];

  const [currentindex, setcurrentindex] = useState(0);

  const nextImage = () => {
    setcurrentindex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const previousImage = () => {
    setcurrentindex((prevIndex) => (prevIndex - 1) % images.length);
  };

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom Carousel Cards
      </h2>

      <div className="w-full">
        <div className="w-full md:w-3/4 h-64 md:h-96 mx-auto relative">
          <button
            onClick={previousImage}
            className="p-2 rounded-full bg-gray-900 text-white cursor-pointer absolute top-[50%] left-4"
            type="button"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <img
            src={images[currentindex]}
            className="w-full h-full object-cover"
            alt=""
          />

          <button
            onClick={nextImage}
            className="p-2 rounded-full bg-gray-900 text-white cursor-pointer absolute top-[50%] right-4"
            type="button"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
