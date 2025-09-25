"use client";

import { Units } from "@/lib/format";

export default function UnitToggle({
    value, onChange 
}: {
    value: Units;
    onChange: (u: Units) => void;
}) {
    return (
        <div className="inline-flex rounded-full border overflow-hidden">
            <button 
                className={`px-3 py-1 text-sm ${value === "metric" ? "bg-sky-100 font-medium" : "bg-white"}`}
                onClick={() => onChange("metric")}
                aria-pressed={value === "metric"}
            >
                °C
            </button>
            <button
                className={`px-3 py-1 text-sm border-l ${value === "imperial" ? "bg-sky-100 font-medium" : "bg-white"}`}
                onClick={() => onChange("imperial")}
                aria-pressed={value === "imperial"}
            >
                °F
            </button>
        </div>
    )
}