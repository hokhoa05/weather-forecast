"use client";
import { HourPoint } from "@/lib/definitions";
import { formatTemp, formatTime, Units } from "@/lib/format";

export default function HourlyStrip({hours, units, tz}: {
    hours: HourPoint[];
    units: Units;
    tz: string;
}) {
    return (
        <div className="rounded-2xl mt-5 border bg-white p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Next 24 hours</h3>
            <div className="flex overflow-x-auto gap-3 pb-2">
                {hours.map((h) => (
                    <div key={h.at} className="min-2-[84px] rounded-xl border bg-white px-3 py-2 text-center">
                        <div className="text-xs text-gray-500">{formatTime(h.at, tz, "HH:mm")}</div>
                        <div className="text-base font-medium">{formatTemp(h.temp, units)}</div>
                        <div className="text-xs text-blue-600">{h.pop}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}