import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Blogdata } from "../utils/data";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [blogs, setBlogs] = useState(Blogdata);

  useEffect(() => {
    setBlogs(
      Blogdata.filter((blog) =>
        blog.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value]);

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom Search Bar
      </h2>

      {/* search bar input field */}
      <div className="flex items-center justify-between p-2 border border-gray-200 w-1/2 rounded-lg bg-blue-100/50 px-4">
        <input
          type="text"
          className="flex-1 bg-transparent h-8 outline-none border-none text-xl font-semibold text-gray-600"
          placeholder="Search here by title..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MdSearch className="text-xl text-gray-600" />
      </div>

      {/* display the records based on the search */}
      <motion.div
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 "
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {blogs.map((blog) => (
            <div
              // layout
              // layoutId={blog.id}
              // initial={{ opacity: 0, scale: 0.9 }}
              // animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0, scale: 0.9 }}
              // transition={{ duration: 0.4, ease: "easeInOut" }}
              key={blog.id}
              className="w-full rounded-lg overflow-hidden flex flex-col items-start gap-4 border border-gray-200 p-2 hover:shadow-md cursor-pointer"
            >
              <img
                src={blog.image}
                className="w-full h-64 object-cover rounded-lg"
                alt=""
              />
              <h2 className="text-lg text-gray-500">{blog.title}</h2>
            </div>
          ))}
        </AnimatePresence>

        {blogs.length === 0 && (
          <div className="col-span-4 flex items-center justify-center">
            <p className="text-3xl font-bold uppercase tracking-widest">
              No Data Found
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;
