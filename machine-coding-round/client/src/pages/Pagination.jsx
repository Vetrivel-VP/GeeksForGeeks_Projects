import React, { useState } from "react";
import { Blogdata } from "../utils/data";

const Pagination = () => {
  // set items per page
  const itemsPerPage = 5;

  // state for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // calculate the total pages
  const totalPages = Math.ceil(Blogdata.length / itemsPerPage);

  // get the current item based on the page
  const currentData = Blogdata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // handle the page changes
  const handlePageChanges = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom Pagination
      </h2>

      {/* display the content */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentData.map((blog) => (
          <div
            key={blog.id}
            className="w-full rounded-lg overflow-hidden flex flex-col items-start gap-4 border border-gray-200 p-2 hover:shadow-md cursor-pointer"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h2 className="text-lg text-gray-500">{blog.title}</h2>
            <p className="text-sm text-gray-400 w-full truncate">
              {blog.description}
            </p>
          </div>
        ))}
      </div>

      {/* display the paginations controls */}

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => handlePageChanges(currentPage - 1)}
          type="button"
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-300 rounded-lg text-sm disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => handlePageChanges(index + 1)}
            type="button"
            key={index}
            className={`w-6 h-6 flex items-center justify-center rounded-lg  ${
              currentPage === index + 1
                ? "bg-blue-400 text-white hover:bg-blue-600 hover:shadow-md"
                : "bg-transparent hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChanges(currentPage + 1)}
          type="button"
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-gray-300 rounded-lg text-sm disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
