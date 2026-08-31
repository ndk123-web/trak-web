import React from "react";

export function FileIconSvg({
  filename,
  className = "w-3.5 h-3.5",
}: {
  filename: string;
  className?: string;
}) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const name = filename.toLowerCase();

  // Go
  if (ext === "go" || name === "go.mod" || name === "go.sum") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 13.5C3 11 5 9 7.5 9H16.5C19 9 21 11 21 13.5C21 16 19 18 16.5 18H7.5C5 18 3 16 3 13.5Z"
          fill="#00ADD8"
          fillOpacity="0.2"
          stroke="#00ADD8"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="13.5" r="1.5" fill="#00ADD8" />
        <circle cx="16" cy="13.5" r="1.5" fill="#00ADD8" />
      </svg>
    );
  }

  // Python
  if (name === "pyproject.toml" || ext === "py") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.5 2 6 3.5 6 6V9H13V10H4C2 10 1 12 1 14.5C1 17 2.5 19 5.5 19H7V16.5C7 14 9 12 11.5 12H18.5C19.5 12 20.5 11 20.5 10V6C20.5 3.5 17.5 2 12 2ZM9 4.5C9.6 4.5 10 4.9 10 5.5C10 6.1 9.6 6.5 9 6.5C8.4 6.5 8 6.1 8 5.5C8 4.9 8.4 4.5 9 4.5Z"
          fill="#3776AB"
        />
        <path
          d="M12 22C15.5 22 18 20.5 18 18V15H11V14H20C22 14 23 12 23 9.5C23 7 21.5 5 18.5 5H17V7.5C17 10 15 12 12.5 12H5.5C4.5 12 3.5 13 3.5 14V18C3.5 20.5 6.5 22 12 22ZM15 19.5C14.4 19.5 14 19.1 14 18.5C14 17.9 14.4 17.5 15 17.5C15.6 17.5 16 17.9 16 18.5C16 19.1 15.6 19.5 15 19.5Z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  // Rust
  if (ext === "rs" || name === "cargo.toml") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7.5" stroke="#DEA584" strokeWidth="1.5" />
        <path
          d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7 7M17 17L19.1 19.1M19.1 4.9L17 7M7 17L4.9 19.1"
          stroke="#DEA584"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" fill="#DEA584" />
      </svg>
    );
  }

  // TypeScript
  if (ext === "ts" || ext === "tsx") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text
          x="12"
          y="16.5"
          fill="white"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          TS
        </text>
      </svg>
    );
  }

  // JavaScript
  if (ext === "js" || ext === "jsx" || ext === "mjs") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <text
          x="12"
          y="16.5"
          fill="#000000"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          JS
        </text>
      </svg>
    );
  }

  // Docker
  if (name === "dockerfile" || name.startsWith("docker-compose")) {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <path
          d="M2 13C2 12 3 11 5 11H19C21 11 22 13 22 15C22 18 19 20 13 20C7 20 2 17 2 13Z"
          fill="#0284C7"
        />
        <rect x="5" y="7" width="2.5" height="2.5" rx="0.5" fill="#38BDF8" />
        <rect x="8.5" y="7" width="2.5" height="2.5" rx="0.5" fill="#38BDF8" />
        <rect x="12" y="7" width="2.5" height="2.5" rx="0.5" fill="#38BDF8" />
        <rect x="8.5" y="3.5" width="2.5" height="2.5" rx="0.5" fill="#38BDF8" />
      </svg>
    );
  }

  // Markdown
  if (ext === "md" || ext === "markdown") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#10B981"
          fillOpacity="0.15"
          stroke="#10B981"
          strokeWidth="1.2"
        />
        <path
          d="M5 16V8L8 11.5L11 8V16M15 12L17.5 15L20 12M17.5 8V15"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // SQL
  if (ext === "sql") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <ellipse
          cx="12"
          cy="6"
          rx="8"
          ry="3"
          fill="#818CF8"
          fillOpacity="0.2"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        <path
          d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        <path
          d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // JSON
  if (ext === "json") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#F59E0B"
          fillOpacity="0.15"
          stroke="#F59E0B"
          strokeWidth="1.2"
        />
        <path
          d="M8 8C7 8 6 9 6 10.5V11C6 11.5 5.5 12 5 12C5.5 12 6 12.5 6 13V13.5C6 15 7 16 8 16M16 8C17 8 18 9 18 10.5V11C18 11.5 18.5 12 19 12C18.5 12 18 12.5 18 13V13.5C18 15 17 16 16 16"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // YAML / YML / TOML
  if (ext === "yml" || ext === "yaml" || ext === "toml") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#F43F5E"
          fillOpacity="0.15"
          stroke="#F43F5E"
          strokeWidth="1.2"
        />
        <path
          d="M7 8L12 13L17 8M12 13V18"
          stroke="#F43F5E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Shell / Script
  if (ext === "sh" || ext === "bash" || ext === "ps1" || ext === "zsh") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#14B8A6"
          fillOpacity="0.15"
          stroke="#14B8A6"
          strokeWidth="1.2"
        />
        <path
          d="M6 8L10 12L6 16M12 16H18"
          stroke="#14B8A6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // C / C++ / H
  if (ext === "c" || ext === "cpp" || ext === "h" || ext === "hpp") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#60A5FA"
          fillOpacity="0.15"
          stroke="#60A5FA"
          strokeWidth="1.2"
        />
        <text
          x="12"
          y="16.5"
          fill="#60A5FA"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {ext === "cpp" || ext === "hpp" ? "C++" : "C"}
        </text>
      </svg>
    );
  }

  // Java
  if (ext === "java") {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#ED8B00"
          fillOpacity="0.15"
          stroke="#ED8B00"
          strokeWidth="1.2"
        />
        <path
          d="M6 10H15C16.66 10 18 11.34 18 13C18 14.66 16.66 16 15 16H6V10ZM6 10V18M18 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11H18M7 7C8 6 9 5 10 6C11 7 12 8 13 7"
          stroke="#ED8B00"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Default File
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2H14L19 7V20C19 21.1 18.1 22 17 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2Z"
        fill="#94A3B8"
        fillOpacity="0.1"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V7H19"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
