"use client";

import React from "react";
// @ts-ignore
import { getClassWithColor, getClass } from "file-icons-js";

export function FileIconSvg({
  filename,
  className = "w-4 h-4",
}: {
  filename: string;
  className?: string;
}) {
  let iconClass: string | null = null;
  try {
    iconClass = getClassWithColor(filename) || getClass(filename);
  } catch (e) {
    // Fallback if filename parsing fails
    iconClass = null;
  }

  if (iconClass) {
    return (
      <span
        className={`${iconClass} inline-flex items-center justify-center text-sm shrink-0 leading-none select-none`}
        aria-hidden="true"
        style={{ minWidth: "16px" }}
      />
    );
  }

  return (
    <span
      className="icon text-icon inline-flex items-center justify-center text-sm shrink-0 leading-none text-slate-400 select-none"
      aria-hidden="true"
    />
  );
}
