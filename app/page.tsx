'use client';

import SearchBar from "@/components/search-bar";
import { Locate, MapPin } from "lucide-react";

export default function HomePage() {
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
            <SearchBar/>
            <button
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-gray-50"
              aria-label="Use my location"
            >
              <Locate className="h-4 w-4"/>
              <span className="hidden sm:inline">Use my location</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}