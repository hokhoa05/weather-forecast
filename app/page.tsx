'use client';

import RecentChips from "@/components/recent-chips";
import SearchBar from "@/components/search-bar";
import { GeoResult } from "@/lib/definitions";
import { readRecent, removeRecent, upsertRecent } from "@/lib/storage";
import { Clock, Locate, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [geoError, setGeoError] = useState<string | null>(null);
  const router = useRouter();
  const [recent, setRecent] = useState<GeoResult[]>([]);
  
  useEffect(() => { setRecent(readRecent()); }, []); 

  function handleSelect(city: GeoResult) {
    const next = upsertRecent(city);
    setRecent(next);
    router.push(`/city?lat=${city.lat}&lon=${city.lon}&name=${encodeURIComponent(city.name)}`);
  }

  function handleRemove(id: string) {
    const next = removeRecent(id);
    setRecent(next);
  }

  function handleUseMyLocation() {
    if(!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const {latitude: lat, longitude: lon} = pos.coords;
        const city = {
          id: `me_${lat.toFixed(3)}_${lon.toFixed(3)}`,
          name: "My location",
          lat, lon,
        };
        const next = upsertRecent(city);
        setRecent(next);
        router.push(`/city?lat=${lat}&lon=${lon}&name=${encodeURIComponent("My location")}`);
      },
      (err) => {
        setGeoError(err.message || "Unable to get your location.");
      }, 
      {enableHighAccuracy: true, timeout: 8000}
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center gap-3">
          <MapPin className="h-6 w-6"/>
          <h1 className="text-xl font-semibold">Weather Forecast with Khoa</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border bg-white shadow-sm p-4 sm:p-6">
          <label className="block text-sm font-medium mb-2">Search a city</label>
          <div className="flex items-center gap-2">
            <SearchBar onSelect={handleSelect} />
            <button
              onClick={handleUseMyLocation}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-gray-50"
              aria-label="Use my location"
            >
              <Locate className="h-4 w-4"/>
              <span className="hidden sm:inline">Use my location</span>
            </button>
          </div>
          
          {recent.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4"/>
                <h2 className="text-sm font-semibold">Recent</h2>
              </div>
              <RecentChips items={recent} onSelect={handleSelect} onRemove={handleRemove}/>
            </div>
          )}

          <>
            {geoError && (
              <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {geoError}
              </div>
            )}
          </>
        </div>
      </main>
    </div>
  );
}