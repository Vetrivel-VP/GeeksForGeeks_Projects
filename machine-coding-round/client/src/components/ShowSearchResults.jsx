import React from "react";

const ShowSearchResults = ({ result, showResults }) => {
  if (!showResults) return null;

  return (
    <div className="w-full bg-gray-100 shadow-md shadow-gray-200 flex flex-col rounded-md mt-4 max-h-80 overflow-y-scroll p-4">
      {result?.length === 0 && (
        <div className="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-md">
          No Results Found
        </div>
      )}

      {result.map((result, i) => (
        <div
          key={i}
          className="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-md"
        >
          {result?.name}
        </div>
      ))}
    </div>
  );
};

export default ShowSearchResults;
