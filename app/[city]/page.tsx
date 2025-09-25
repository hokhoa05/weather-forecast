'use client';

import { formatTemp, formatWind, Units } from "@/lib/format";
import { useSearchParams } from "next/navigation";

export default function CityPage() {
    const sp = useSearchParams();
    const name = sp.get('name') ?? "Unknown";
    const lat = sp.get('lat');
    const lon = sp.get('lon');
    const latNum = Number(lat);
    const lonNum = Number(lon);
    const units = (sp.get("units") === "imperial" ? "imperial" : "metric") as Units;

    const valid = Number.isFinite(latNum) && Number.isFinite(lonNum);

    const demoTempC = 31.4;
    const demoWindKph = 12.8;
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            <main className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-2xl font-semibold mb-2">Forecast: {name}</h1>
                {!valid ? (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
                        Missing or invalid coordinates. Go back and select a city from the Home page.
                    </div>
                ) : (
                    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                        <p>Ready to fetch forecast for {name} @ {latNum.toFixed(4)}, {lonNum.toFixed(4)} • Units: {units}</p>
                    </div>
                )}
                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm space-y-2">
                    <div>Temp now: <strong>{formatTemp(demoTempC, units)}</strong></div>
                    <div>Wind: <strong>{formatWind(demoWindKph, units)}</strong></div>
                    <p className="text-xs text-gray-500">(Demo values; will be replaced by API data.)</p>
                </div>
            </main>
        </div>
    )
}