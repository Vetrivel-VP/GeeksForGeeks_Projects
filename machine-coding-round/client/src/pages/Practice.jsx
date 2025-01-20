import React, { useState } from "react";
import { Blogdata } from "../utils/data";

const Practice = () => {
  // Set items per page
  const itemsPerPage = 5;

  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(Blogdata.length / itemsPerPage);

  // Get the current items based on page
  const currentData = Blogdata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Paginated Blog Data
      </h2>

      {/* Display the current blog items */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentData.map((blog) => (
          <div
            key={blog.id}
            className="w-full rounded-lg overflow-hidden flex flex-col items-start gap-4 border border-gray-200 p-2 hover:shadow-md cursor-pointer"
          >
            <img
              src={blog.image}
              className="w-full h-64 object-cover rounded-lg"
              alt={blog.title}
            />
            <h2 className="text-lg text-gray-500">{blog.title}</h2>
            <p className="text-sm text-gray-400">{blog.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Practice;
