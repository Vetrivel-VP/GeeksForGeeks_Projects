import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Blogdata } from "../utils/data";

const CustomSearchBarClient = () => {
  const [input, setInput] = useState("");
  const [blogs, setBlogs] = useState(Blogdata);

  useEffect(() => {
    setBlogs(
      Blogdata.filter((blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  return (
    <React.Fragment>
      {/* search bar */}
      <div className="flex items-center justify-between p-3 border border-gray-100 w-full md:w-1/2  rounded-lg bg-blue-100/50">
        <input
          value={input}
          type="text"
          placeholder="Search here by title...!"
          className=" flex-1 bg-transparent h-8 outline-none border-none text-lg font-semibold text-gray-700"
          onChange={(event) => setInput(event.target.value)}
        />
        <MdSearch className="text-xl text-gray-600" />
      </div>
      {/* display the records */}

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
        {blogs && blogs.length === 0 && (
          <div>
            <p>No data found</p>
          </div>
        )}

        {blogs &&
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="w-full rounded-lg overflow-hidden flex flex-col items-start gap-4 border border-gray-200 p-2 hover:shadow-md cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2>{blog.title}</h2>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default CustomSearchBarClient;
