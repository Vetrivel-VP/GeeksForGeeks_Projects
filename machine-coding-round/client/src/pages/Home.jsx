import React from "react";
import { Header } from "../components";
import { Link, Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

const Home = () => {
  const routes = [
    { link: "/draganddrop", label: "Drag & Drop" },
    { link: "/accordion", label: "Accordion" },
    { link: "/toast", label: "Toast" },
    { link: "/carousel", label: "Carousel" },
    { link: "/infiniteScroll", label: "Infinite Scroll" },
    { link: "/auto-suggestion", label: "Auto Suggestion" },
    { link: "/breadCrumb", label: "BreadCrumb" },
    { link: "/formValidations", label: "Form Validations" },
    { link: "/searchBar", label: "Custom Search Bar" },
    { link: "/pagination", label: "Pagination" },
  ];

  return (
    <div className="flex-col px-4 container max-w-screen-xl">
      <Header />

      <div className="w-full flex items-center justify-center flex-wrap gap-12">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-2 text-xl"
        >
          <FaHouse className="text-xl text-gray-800" />
          Home
        </Link>

        {routes.map((item) => (
          <Link
            key={item.link}
            to={item.link}
            className="flex items-center justify-center gap-2 text-xl"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="w-full flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
