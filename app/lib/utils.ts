/* eslint-disable prettier/prettier */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ellipsis = (text: string, maxLength = 20) => {
  if (typeof text !== "string") return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
