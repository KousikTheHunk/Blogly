import React from "react";

const COLOR_MAP = {
  // Tailwind bg-* mappings
  "bg-blue-600": "#2563eb",
  "bg-green-500": "#22c55e",
  "bg-red-500":   "#ef4444",
  // add more as needed...
  // Tailwind text-* mappings
  "text-white":   "#ffffff",
  "text-black":   "#000000",
  // add more as needed...
};

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  style: userStyle = {},
  ...props
}) {
  // Base style (padding + border-radius) :contentReference[oaicite:0]{index=0}
  const baseStyle = {
    padding: "0.5rem 1rem",       // px-4 py-2 → 1rem horizontal, 0.5rem vertical :contentReference[oaicite:1]{index=1}
    borderRadius: "0.5rem",       // rounded-lg → 0.5rem :contentReference[oaicite:2]{index=2}
    border: "none",
    cursor: "pointer",
    display: "inline-block",
    font: "inherit",
    lineHeight: 1.2
  };

  // Pick mapped colors or fallback to raw values
  const resolvedBg = COLOR_MAP[bgColor] || bgColor;
  const resolvedText = COLOR_MAP[textColor] || textColor;

  const combinedStyle = {
    ...baseStyle,
    backgroundColor: resolvedBg,
    color: resolvedText,
    ...userStyle
  };

  return (
    <button type={type} style={combinedStyle} {...props}>
      {children}
    </button>
  );
}
