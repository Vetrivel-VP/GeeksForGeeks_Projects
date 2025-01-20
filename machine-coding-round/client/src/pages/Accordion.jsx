import React, { useState } from "react";
import { Blogdata } from "../utils/data";
import { FaChevronDown } from "react-icons/fa6";

const Accordion = () => {
  //   const [openIndex, setOpenIndex] = useState(null);

  //   const handleClick = (index) => {
  //     setOpenIndex(openIndex === index ? null : index);
  //   };

  const [openIndices, setOpenIndices] = useState([]);

  const handleClick = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom Accordion
      </h2>

      {Blogdata.slice(0, 3).map((blog, index) => (
        <AccordionItem
          key={blog.id}
          item={blog}
          isOpen={openIndices.includes(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 w-full md:w-1/2 py-4">
      <button
        className="w-full text-left p-4 focus:outline-none focus-visible:ring focus-visible:ring-gray-300"
        type="button"
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <span>{item.title}</span>
          <FaChevronDown
            className={`text-lg text-gray-500 ${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-transform`}
          />
        </div>
      </button>

      <div
        className={`flex items-start overflow-hidden transition-all duration-300 px-4 gap-2  ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <img
          src={item.image}
          className="w-24 min-w-24 h-16 rounded-md object-cover"
          alt=""
        />
        <p className="text-justify text-sm text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
          sapiente laboriosam eos numquam, ab beatae perspiciatis voluptates
          labore suscipit enim ducimus eaque, aspernatur minus voluptatem vel
          pariatur veritatis voluptas quae.
        </p>
      </div>
    </div>
  );
};

export default Accordion;
