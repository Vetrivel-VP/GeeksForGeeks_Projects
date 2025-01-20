import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { cn } from "../../utils/utils";

// Container

const Breadcrumb = React.forwardRef((props, ref) => (
  <nav ref={ref} {...props} aria-label="breadcrumb" />
));

Breadcrumb.displayName = "Breadcrumb";

// List

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 sm:gap-2.5",
      className
    )}
    {...props}
  />
));

BreadcrumbList.displayName = "BreadcrumbList";

// Item

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));

BreadcrumbItem.displayName = "BreadcrumbItem";

// Link

const BreadcrumbLink = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("transition-colors hover:text-gray-600", className)}
    {...props}
  />
));

BreadcrumbLink.displayName = "BreadcrumbLink";

// Current Page
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-gray-600", className)}
    {...props}
  />
));

BreadcrumbPage.displayName = "BreadcrumbPage";

//   seaprator

const BreadcrumbSeparator = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <li
      role="presentation"
      aria-hidden="true"
      ref={ref}
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <FaChevronRight />}
    </li>
  )
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// ellipsis
const BreadcrumbEllipsis = React.forwardRef(({ className, ...props }, ref) => (
  <span
    role="presentation"
    aria-hidden="true"
    ref={ref}
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <BsThreeDots className="w-4 h-4" />
    <span className="sr-only">More</span>
  </span>
));

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// Export all
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

("use client");

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export const CustomBreadCrumb = ({ breadcrumbPage, breadCrumbItems }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center justify-center hover:text-blue-500"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbItems && (
          <React.Fragment>
            {breadCrumbItems.map((item, i) => (
              <React.Fragment key={i + item.link}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.link}
                    className="hover:text-blue-500"
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

import React from "react";
import { cn } from "../../lib/utils";

// Container
const Select = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
));
Select.displayName = "Select";

// Trigger (Button)
const SelectTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "w-full px-4 py-2 text-left border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
    {...props}
  />
));
SelectTrigger.displayName = "SelectTrigger";

// Content (Dropdown)
const SelectContent = React.forwardRef(({ className, isOpen, ...props }, ref) =>
  isOpen ? (
    <ul
      ref={ref}
      className={cn(
        "absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow-md",
        className
      )}
      {...props}
    />
  ) : null
);
SelectContent.displayName = "SelectContent";

// Group (Item Wrapper)
const SelectGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-1", className)} {...props} />
));
SelectGroup.displayName = "SelectGroup";

// Label
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-2 text-sm text-gray-500", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

// Item
const SelectItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("cursor-pointer px-4 py-2 hover:bg-gray-100", className)}
    {...props}
  />
));
SelectItem.displayName = "SelectItem";

// Value
const SelectValue = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("text-gray-700", className)} {...props}>
      {children}
    </span>
  )
);
SelectValue.displayName = "SelectValue";

// Separator (Optional)
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-px bg-gray-200", className)} {...props} />
));
SelectSeparator.displayName = "SelectSeparator";

// Export all components
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
  SelectSeparator,
};
