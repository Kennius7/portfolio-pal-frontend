"use client";

interface SignalStrengthProps {
  percentage: number;
  showLabel?: boolean;
}

const bars = [
  { height: 10, color: "#ef4444" }, // red
  { height: 15, color: "#f97316" }, // orange
  { height: 20, color: "#eab308" }, // yellow
  { height: 25, color: "#22c55e" }, // green
  { height: 30, color: "#3b82f6" }, // blue
];

export default function SignalStrength({
  percentage,
  showLabel = true,
}: SignalStrengthProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="flex items-end gap-3">
      <div className="flex items-end gap-1">
        {bars.map((bar, index) => {
          const start = index * 20;
          const fillPercent = Math.max(
            0,
            Math.min(100, ((clampedPercentage - start) / 20) * 100),
          );

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-t-sm bg-gray-200 dark:bg-gray-700"
              style={{
                width: 5,
                height: bar.height,
              }}
            >
              <div
                className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out"
                style={{
                  height: `${fillPercent}%`,
                  backgroundColor: bar.color,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* {showLabel && (
        <span className="text-sm font-medium">
          {clampedPercentage.toFixed(0)}%
        </span>
      )} */}
    </div>
  );
}
