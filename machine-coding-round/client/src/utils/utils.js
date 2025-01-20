import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// rest paramter

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
