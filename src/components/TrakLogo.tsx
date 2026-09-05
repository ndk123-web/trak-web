import React from "react";

interface TrakLogoProps {
  size?: number;
  className?: string;
}

export function TrakLogo({ size = 28, className = "" }: TrakLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
    >
      <defs>
        <linearGradient id="trakGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="trakTrackGrad" x1="12" y1="8" x2="28" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Outer rounded minimal container / subtle glow */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        fill="#0b0f19"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.5"
      />

      {/* Main Stylized 'T' with curved track pathway */}
      <path
        d="M9 11C9 10.4477 9.44772 10 10 10H30C30.5523 10 31 10.4477 31 11V14C31 14.5523 30.5523 15 30 15H23.5V28C23.5 29.1046 22.6046 30 21.5 30H18.5C17.3954 30 16.5 29.1046 16.5 28V15H10C9.44772 15 9 14.5523 9 14V11Z"
        fill="url(#trakGrad)"
      />

      {/* S-curve Track Rail Line cutting through the T stem */}
      <path
        d="M14 29C14 26 21 24 21 21C21 18 19 16 19 14"
        stroke="url(#trakTrackGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />

      {/* Terminal prompt chevron on top-left */}
      <path
        d="M5.5 20L8 22.5L5.5 25"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
