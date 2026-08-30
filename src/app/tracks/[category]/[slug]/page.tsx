import { notFound } from "next/navigation";
import Link from "next/link";
import { getTrackBySlug, getTracksByCategory, TRACKS } from "@/data/tracks";
import {
  Terminal,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  FolderTree,
} from "lucide-react";
import { TrackDetailClient } from "./TrackDetailClient";

interface TrackPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TRACKS.map((t) => ({
    category: t.category,
    slug: t.slug,
  }));
}

export default async function TrackDetailPage({ params }: TrackPageProps) {
  const { category, slug } = await params;
  const track = getTrackBySlug(category, slug);

  if (!track) {
    notFound();
  }

  const relatedTracks = getTracksByCategory(category)
    .filter((t) => t.slug !== slug)
    .slice(0, 2);

  return <TrackDetailClient track={track} relatedTracks={relatedTracks} />;
}
