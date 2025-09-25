"use client";
export default function ErrorState({ msg }:{ msg: string }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm">
      {msg}
    </div>
  );
}