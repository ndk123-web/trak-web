import { CatalogExplorer } from "@/components/CatalogExplorer";

export const metadata = {
  title: "All 19 Learning Tracks • Trak CLI Catalog",
  description: "Browse all 19 in-depth learning tracks across Programming Languages, Operating Systems, Cloud Infrastructure, Databases, and DevOps Tools.",
};

export default function TracksPage() {
  return (
    <div className="py-8">
      <CatalogExplorer />
    </div>
  );
}
