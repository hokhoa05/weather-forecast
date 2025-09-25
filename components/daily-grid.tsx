"use client";

import { DayPoint } from "@/lib/definitions";
import { formatTemp, formatTime, Units } from "@/lib/format";

export default function DailyGrid({days, units, tz}: {
    days: DayPoint[];
    units: Units;
    tz: string;
}) {
    return (
        <div className="rounded-2xl border mt-5 bg-white p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Next 7 days</h3>
            <div className="gird sm:grid-cols-2 gap-3">
                {days.map((d, index)=>(
                    <div key={d.date} className={`rounded-xl ${index > 0 ? "mt-3" : ""} border bg-white px-4 py-3 flex items-center gap-3`}>
                        <div className="w-28 text-sm text-gray-600">{formatTime(d.date, tz, "EEE d MMM")}</div>
                        <img src={`/weather/${d.iconDay}.svg`} alt="" className="h-8 w-8" />
                        <div className="text-sm flex-1">
                            <div className="font-medium">{formatTemp(d.tMax, units)}/{formatTemp(d.tMin, units)}</div>
                            <div className="text-xs text-gray-500">Sun {formatTime(d.sunrise, tz, "HH:mm")}–{formatTime(d.sunset, tz, "HH:mm")} • POP {d.pop}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}