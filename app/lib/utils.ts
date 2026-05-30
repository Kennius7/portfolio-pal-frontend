import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";

interface FormatOptions {
  format?: string;
  timezone?: string;
  isUTC?: boolean;
}

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

export function formatDateWithMoment(
  isoString: string,
  { format = "MMMM DD, YYYY", timezone, isUTC = false }: FormatOptions = {},
): string {
  if (!isoString) return "Invalid date";

  let date = isUTC ? moment.utc(isoString) : moment(isoString);

  if (!date.isValid()) return "Invalid date";

  if (timezone) {
    date = date.tz(timezone);
  }

  return date.format(format);
}
