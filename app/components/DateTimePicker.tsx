"use client";

import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";

// Import the base styles required by react-day-picker
import "react-day-picker/dist/style.css";

interface DateTimePickerProps {
  label?: string;
  onChange: (date: Date | undefined) => void;
  value: Date | undefined;
}

export default function DateTimePicker({
  label = "Pick Date & Time",
  onChange,
  value,
}: DateTimePickerProps) {
  //   const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  //   const selectedDate = value;
  const selectedDate =
    typeof value === "string"
      ? value
      : value instanceof Date
        ? value
        : undefined;

  // Extract current time strings for the inputs
  const currentHour = selectedDate ? format(selectedDate, "HH") : "12";
  const currentMinute = selectedDate ? format(selectedDate, "mm") : "00";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClickOutside(popoverRef as any, () => setIsOpen(false));

  // Handle outside clicks to close the popover
  //   useEffect(() => {
  //     function handleClickOutside(event: MouseEvent) {
  //       if (
  //         popoverRef.current &&
  //         !popoverRef.current.contains(event.target as Node)
  //       ) {
  //         setIsOpen(false);
  //       }
  //     }
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }, []);

  const handleDaySelect = (day?: Date) => {
    if (!day) return;

    let updated = setHours(day, parseInt(currentHour, 10));

    updated = setMinutes(updated, parseInt(currentMinute, 10));

    onChange(updated);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) return;

    const [hours, minutes] = e.target.value.split(":");

    let updated = setHours(value, Number(hours));

    updated = setMinutes(updated, Number(minutes));

    onChange(updated);
  };

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 
        rounded-lg shadow-sm text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <CalendarIcon className="h-4 w-4 text-gray-400" />
        {selectedDate ? (
          format(selectedDate, "PPP p")
        ) : (
          <span className="text-gray-400">Select date and time</span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute left-0 mt-2 z-50 bg-white border border-gray-200 
            rounded-xl shadow-xl flex flex-col md:flex-row divide-y md:divide-y-0 
            md:divide-x divide-gray-100 p-2"
        >
          {/* Calendar Side */}
          <div className="p-1">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDaySelect}
              className="m-0"
              modifiersClassNames={{
                selected:
                  "bg-indigo-600 text-white hover:bg-indigo-700 rounded-md",
                today: "font-bold text-indigo-600",
              }}
            />
          </div>

          {/* Time Picker Side */}
          <div
            className="p-4 flex flex-col justify-center min-w-[160px] bg-gray-50/50 
            rounded-b-xl md:rounded-b-none md:rounded-r-xl"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Select Time</span>
            </div>
            <input
              type="time"
              value={`${currentHour}:${currentMinute}`}
              onChange={handleTimeChange}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 
              text-sm font-medium shadow-sm focus:outline-none focus:ring-1 
              focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
              Time is relative to your local timezone browser context.
            </p>
          </div>
        </div>
      )}

      {/* Hidden value form integration wrapper */}
      {selectedDate && (
        <input
          type="hidden"
          name="dateTime"
          value={selectedDate instanceof Date ? selectedDate.toISOString() : ""}
        />
      )}
    </div>
  );
}
