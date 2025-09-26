"use client";

import { Current } from "@/lib/definitions";
import { formatTemp, formatTime, formatWind, Units } from "@/lib/format";
import Image from "next/image";

export default function NowCard({cur, units, tz}: {
    cur: Current;
    units: Units;
    tz: string;
}) {
    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Image
                src={`/weather/${cur.icon}.svg`}
                alt={cur.summary}
                width={48}
                height={48}
                className="h-12 w-12"
            />
            <div className="flex items-baseline gap-3">
                <div className="text-4xl font-semibold">{formatTemp(cur.temp, units)}</div>
                <div className="text-gray-500">{cur.summary}</div>
                <div className="ml-auto text-xs text-gray-400">{formatTime(cur.at, tz, "HH:mm")}</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-gray-700">
                <div>Feels like: <b>{formatTemp(cur.feelsLike, units)}</b></div>
                <div>Wind: <b>{formatWind(cur.windKph, units)}</b></div>
                <div>Humidity: <b>{cur.humidity}%</b></div>
            </div>
        </div>
    );
}