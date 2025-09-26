"use client";
type Props = { h?: number, mt?: number };

export function SkeletonBlock({ h = 80, mt = 0 }: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm" style={{marginTop: mt}}>
      <div
        className="animate-pulse bg-gray-100 rounded-2xl"
        style={{ height: h }}   
      />
    </div>
  );
}