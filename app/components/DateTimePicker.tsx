"use client";

import { useState, useRef, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import { format, setHours, setMinutes, isValid } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";

import "react-day-picker/dist/style.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DateTimePickerProps {
  label?: string;
  value?: Date | "ongoing";
  onChange: (date: Date | "ongoing" | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toValidDate(value: unknown): Date | undefined {
  if (value instanceof Date && isValid(value)) return value;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return isValid(parsed) ? parsed : undefined;
  }
  return undefined;
}

function applyTime(base: Date, hours: number, minutes: number): Date {
  return setMinutes(setHours(base, hours), minutes);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DateTimePicker({
  label = "Pick Date & Time",
  value,
  onChange,
  placeholder = "Select date and time",
  disabled = false,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const selectedDate = toValidDate(value);

  const hours = selectedDate ? format(selectedDate, "HH") : "12";
  const minutes = selectedDate ? format(selectedDate, "mm") : "00";

  useClickOutside(popoverRef, () => setIsOpen(false));

  const toggle = useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  const handleDaySelect = useCallback(
    (day: Date | undefined) => {
      if (!day) return;
      onChange(applyTime(day, parseInt(hours, 10), parseInt(minutes, 10)));
    },
    [hours, minutes, onChange],
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedDate) return;
      const [h, m] = e.target.value.split(":").map(Number);
      onChange(applyTime(selectedDate, h, m));
    },
    [selectedDate, onChange],
  );

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="
          inline-flex items-center gap-2 px-4 py-2
          border border-gray-300 rounded-lg shadow-sm
          text-sm font-medium bg-white text-gray-700
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
        "
      >
        <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
        {selectedDate ? (
          <span>{format(selectedDate, "PPP p")}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Date and time picker"
          className="
            absolute left-0 mt-2 z-50 bg-black
            border border-gray-200 rounded-xl shadow-xl
            flex flex-col md:flex-row
            divide-y md:divide-y-0 md:divide-x divide-gray-100
            p-2 animate-in fade-in slide-in-from-top-1 duration-1000
          "
        >
          {/* Calendar */}
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

          {/* Time Picker */}
          <div
            className="p-4 flex flex-col justify-center min-w-[160px] 
            bg-gradient rounded-br-xl rounded-tr-xl"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
              <Clock className="h-4 w-4 text-gray-500 shrink-0" />
              <span>Select Time</span>
            </div>

            <input
              type="time"
              value={`${hours}:${minutes}`}
              onChange={handleTimeChange}
              disabled={!selectedDate}
              aria-label="Select time"
              className="
                w-full bg-gray-900 border border-gray-300 rounded-md
                px-3 py-1.5 text-sm font-medium shadow-sm
                focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            />

            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
              Time shown in your local timezone.
            </p>
          </div>
        </div>
      )}

      {/* Hidden input for form integration */}
      {selectedDate && (
        <input
          type="hidden"
          name="dateTime"
          value={selectedDate.toISOString()}
        />
      )}
    </div>
  );
}
