"use client";
import React from "react";

interface DiceProps {
  value: number | null;
  rolling: boolean;
  size?: number;
}

// Dots positions for SVG
const dotPos = [
  [],
  [[0.5, 0.5]],
  [[0.25, 0.25], [0.75, 0.75]],
  [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  [[0.25, 0.25], [0.25, 0.75], [0.75, 0.25], [0.75, 0.75]],
  [[0.25, 0.25], [0.25, 0.75], [0.5, 0.5], [0.75, 0.25], [0.75, 0.75]],
  [[0.25, 0.25], [0.25, 0.5], [0.25, 0.75], [0.75, 0.25], [0.75, 0.5], [0.75, 0.75]],
];

export default function Dice({ value, rolling, size = 64 }: DiceProps) {
  return (
    <div className={`transition-all duration-300 ${rolling ? "animate-bounce" : ""}`}
         style={{ width: size, height: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
          <rect
            x="5" y="5" width="90" height="90" rx="18"
            fill="#fffbea"
            stroke="#eab308"
            strokeWidth="6"
          />
          {dotPos[(typeof value === "number" && value >= 1 && value <= 6) ? value : 1].map(([x, y], i) => (
            <circle
              key={i}
              cx={x * 100}
              cy={y * 100}
              r="9"
              fill="#eab308"
              stroke="#92400e"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
