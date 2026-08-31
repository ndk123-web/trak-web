import React from "react";
import { BlueprintStudio } from "@/components/studio/BlueprintStudio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blueprint Studio — Visual Trak Registry AST Builder",
  description:
    "Design, visualize, edit, and export structured engineering curricula and AST JSON blueprints for Trak CLI with live tree explorer and 1-click GitHub PR export.",
};

export default function StudioPage() {
  return (
    <div className="w-full h-full">
      <BlueprintStudio />
    </div>
  );
}
