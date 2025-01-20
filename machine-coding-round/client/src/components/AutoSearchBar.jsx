import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";

const AutoSearchBar = ({ setResult, setShowResults }) => {
  const [input, setInput] = useState("");
  const searchWrapperRef = useRef();

  const fetchData = async (value) => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return user && user?.name && user?.name.toLowerCase().includes(value);
        });

        setResult(results);
        setShowResults(true);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  //   handle the click event outside the container
  useEffect(() => {
    const handleClickOutsideContainer = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideContainer);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideContainer);
    };
  }, [searchWrapperRef]);

  return (
    <div
      ref={searchWrapperRef}
      className="bg-gray-50 w-full rounded-md px-3 py-2 flex items-center shadow-md shadow-gray-200"
    >
      <FcSearch className="text-lg" />
      <input
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        type="text"
        className="bg-transparent border-none outline-none w-full ml-3"
        placeholder="Type to search"
      />
    </div>
  );
};

export default AutoSearchBar;
