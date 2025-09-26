'use client';

import DailyGrid from "@/components/daily-grid";
import ErrorState from "@/components/error-state";
import HourlyStrip from "@/components/hourly-strip";
import NowCard from "@/components/now-card";
import { SkeletonBlock } from "@/components/skeletons";
import { Forecast } from "@/lib/definitions";
import { Units } from "@/lib/format";
import { fetchForecast } from "@/lib/weather";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CityPage() {
    const sp = useSearchParams();
    const name = sp.get('name') ?? "Unknown";
    const lat = sp.get('lat');
    const lon = sp.get('lon');
    const latNum = Number(lat);
    const lonNum = Number(lon);
    const units = (sp.get("units") === "imperial" ? "imperial" : "metric") as Units;

    const valid = Number.isFinite(latNum) && Number.isFinite(lonNum);

    const [data, setData] = useState<Forecast | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(!valid) {
            setError("Invalid or missing coordinates.");
            setLoading(false);
            return;
        }
        let cancelled = false;
        setLoading(true);
        setError(null);
        fetchForecast(latNum, lonNum, name)
            .then(f => {
                if(!cancelled) setData(f);
            })
            .catch(e => {
                if(!cancelled) setError(e?.message || "Failed to load forecast.");
            })
            .finally(() => {
                if(!cancelled) setLoading(false);
            })
        return () => {cancelled = true;};
    }, [latNum, lonNum, name, valid]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            <main className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-2xl font-semibold mb-2">Forecast: {name}</h1>
                
                {loading && (
                    <>
                        <SkeletonBlock h={120}/>
                        <SkeletonBlock h={140} mt={20}/>
                        <SkeletonBlock h={220} mt={20}/>
                    </>
                )}

                {!loading && error && <ErrorState msg={error}/>}

                {!loading && !error && data && (
                    <>
                        <NowCard cur={data.current} units={units} tz={data.location.tz}/>
                        <HourlyStrip hours={data.hourly} units={units} tz={data.location.tz}/>
                        <DailyGrid days={data.daily} units={units} tz={data.location.tz} />
                    </>
                )}
            </main>
        </div>
    )
}