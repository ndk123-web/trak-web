"use client";

import React, { useEffect, useRef, useState } from "react";

interface AmbientVideoProps {
  src: string;
}

export function AmbientVideo({ src }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure browser autoplay policy criteria are strictly satisfied
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // Autoplay blocked by browser policy until interaction or readyState
          console.debug("Video autoplay waiting for user readyState:", err);
        });
    };

    // Attempt play immediately
    attemptPlay();

    // Also trigger on loadeddata & canplay
    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);

    // Use IntersectionObserver to play whenever user scrolls/views the video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-contain pointer-events-none"
    />
  );
}
