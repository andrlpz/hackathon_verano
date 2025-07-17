"use client";
import React from "react";

interface RouletteProps {
  value: number | null;
  spinning: boolean;
  size?: number;
}

const numbers = [1, 2, 3, 4, 5, 6];

export default function Roulette({ value, spinning, size = 90 }: RouletteProps) {
  // Calcula el ángulo donde debe quedar la ruleta para mostrar el valor arriba
  const anglePer = 360 / numbers.length;
  const targetIdx = value ? numbers.indexOf(value) : 0;
  const targetAngle = 360 - targetIdx * anglePer;
  // Si está girando, rota muchas vueltas
  const spinAngle = spinning ? 360 * 5 + targetAngle : targetAngle;

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size+20 }}>
      <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-10">
        <svg width="28" height="18"><polygon points="14,0 28,18 0,18" fill="#eab308" stroke="#92400e" strokeWidth="2"/></svg>
      </div>
      <div
        className="transition-transform duration-700 ease-out"
        style={{ width: size, height: size, borderRadius: '50%', overflow: 'visible', transform: `rotate(${spinAngle}deg)` }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}> 
          {numbers.map((n, i) => {
            const angle = anglePer * i - 90;
            const rad = (angle * Math.PI) / 180;
            const x = size / 2 + (size / 2 - 18) * Math.cos(rad);
            const y = size / 2 + (size / 2 - 18) * Math.sin(rad);
            return (
              <g key={n}>
                {/* Sector */}
                <path
                  d={`M${size/2},${size/2} L${size/2 + (size/2-8)*Math.cos((anglePer*i-90)*Math.PI/180)},${size/2 + (size/2-8)*Math.sin((anglePer*i-90)*Math.PI/180)}
                  A${size/2-8},${size/2-8} 0 0,1 ${size/2 + (size/2-8)*Math.cos((anglePer*(i+1)-90)*Math.PI/180)},${size/2 + (size/2-8)*Math.sin((anglePer*(i+1)-90)*Math.PI/180)} Z`}
                  fill={i%2===0?"#fde68a":"#fbbf24"}
                  stroke="#eab308"
                  strokeWidth="2"
                />
                {/* Número */}
                <text
                  x={x}
                  y={y+4}
                  textAnchor="middle"
                  fontSize={size/7}
                  fill="#92400e"
                  fontWeight="bold"
                >
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
