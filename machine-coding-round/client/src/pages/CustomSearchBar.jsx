import React from "react";
import { CustomSearchBarClient } from "../components";

const CustomSearchBar = () => {
  return (
    <div className="w-full  flex items-center justify-center flex-col gap-12 mt-8">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom Search Bar
      </h2>

      <CustomSearchBarClient />
    </div>
  );
};

export default CustomSearchBar;
