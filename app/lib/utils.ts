import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";
import { Portfolio } from "../types/types";
import { toast } from "sonner";

interface FormatOptions {
  format?: string;
  timezone?: string;
  isUTC?: boolean;
}

// type DateDiff = {
//   years: number;
//   months: number;
//   days: number;
// };

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
  isoString: string | Date,
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

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export function getDateDiff(start: Date, end: Date): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }

  // Ensure start <= end
  const from = startDate <= endDate ? startDate : endDate;
  const to = startDate <= endDate ? endDate : startDate;

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  // Adjust negative days
  if (days < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  // Adjust negative months
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const timeElapsed = `${years} ${years === 1 ? "year" : "years"}, ${months} ${months === 1 ? "month" : "months"}, and ${days} ${days === 1 ? "day" : "days"}`;
  return timeElapsed;
}

export const handleResumeDownload = async (portfolio: Portfolio) => {
  const downloadUrl = `${portfolio.resumeUrl}?fl_attachment`;

  if (!downloadUrl) {
    toast.error("No resume available");
    return;
  }

  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error("Failed to fetch file");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${portfolio.title || "resume"}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error(err);
    toast.error("Download failed. Opening file instead.");
    window.open(downloadUrl, "_blank");
  }
};
