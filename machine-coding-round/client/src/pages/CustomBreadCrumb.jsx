import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/bread-crumb";
import { Link } from "react-router-dom";
import { FaHouse, FaSlash } from "react-icons/fa6";

const CustomBreadCrumb = () => {
  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom BreadCrumb
      </h2>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/"} className="flex items-center justify-center gap-2">
                <FaHouse />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/components"}>Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
            <BreadcrumbSeparator />
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>Phones</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default CustomBreadCrumb;
