"use client";
export function SkeletonBlock({ h = 80, mt = 0 }:{ h?: number; mt?: number }) {
  return (
  <div className={`rounded-2xl border bg-white shadow-sm mt-${mt}`}>
    <div className="animate-pulse h-[var(--h)] bg-gray-100 rounded-2xl" style={{ ["--h" as any]: `${h}px` }} />
  </div>
  );
}