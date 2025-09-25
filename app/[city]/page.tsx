'use client';

import { useSearchParams } from "next/navigation";

export default function CityPage() {
    const sp = useSearchParams();
    const name = sp.get('name') ?? "Unknown";
    const lat = sp.get('lat');
    const lon = sp.get('lon');
    const latNum = Number(lat);
    const lonNum = Number(lon);

    const valid = Number.isFinite(latNum) && Number.isFinite(lonNum);

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
                        <p>Ready to fetch forecast for {name} @ {latNum.toFixed(4)}, {lonNum.toFixed(4)}</p>
                    </div>
                )}
                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                    <p className="text-gray-700">
                        (Stub) Here we will fetch your forecast later using these query params.
                    </p>
                </div>
            </main>
        </div>
    )
}