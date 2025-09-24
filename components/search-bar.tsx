"use client"

import { GeoResult } from "@/lib/definitions";
import { useDebounced } from "@/lib/hooks";
import { mockGeocode } from "@/lib/mock-data";
import { cls } from "@/lib/ui"
import { Search } from "lucide-react"
import { useEffect, useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<GeoResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeIdx, setActiveIdx] = useState<number>(-1);
    const debounced = useDebounced(query, 300);

    useEffect(() => {
        setActiveIdx(results.length ? 0 : -1);
    }, [results.length])

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if(!results.length) return;
        if(e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => (i + 1) % results.length);
        } else if(e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => (i - 1 + results.length) % results.length);
        } else if(e.key === "Enter" && activeIdx >= 0) {
            e.preventDefault();
            const c = results[activeIdx];
            alert(`${c.name} (${c.lat.toFixed(2)}, ${c.lon.toFixed(2)})`);
        }
    }

    useEffect(() => {
        let cancelled = false;
        const q = debounced.trim();
        if(!q) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);

        (async () => {
            console.log("[geocode:start]", q);
            try {
                const results = await mockGeocode(q);
                if(!cancelled) setResults(results);
            } catch (error) {
                if(!cancelled) setError("Search failed. Please try again.");
            } finally {
                if(!cancelled) setLoading(false);
            }

        })();

        return () => { cancelled = true; };
    }, [debounced]);

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 "/>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hanoi, Paris, Tokyo..."
                className={cls(
                    "w-full pl-10 pr-3 py-3 rounded-xl border outline-none",
                    "focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400"
                )}
                autoComplete="off"
                onKeyDown={onKeyDown}
            />
            {(loading || results.length > 0 || error) && (
                <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
                    {loading && (
                        <div className="p-3 text-sm text-gray-600">Searching...</div>
                    )}
                    {error && (
                        <div className="p-3 text-sm text-rose-600">{error}</div>
                    )}
                    {!loading && !error && results.map((c, i) => (
                        <button
                            key={c.id}
                            onClick={() => alert(`${c.name} (${c.lat.toFixed(2)}, ${c.lon.toFixed(2)})`)}
                            className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-sky-50 ${i === activeIdx ? "bg-sky-50" : ""}`}
                        >
                            <span className="text-sm font-medium">{c.name}</span>
                            {c.country && <span className="text-xs text-gray-500">{c.country}</span>}
                            <span className="ml-auto text-xs text-gray-400">
                                {c.lat.toFixed(2)}, {c.lon.toFixed(2)}
                            </span>
                        </button>
                    ))}
                    {!loading && !error && results.length === 0 && debounced && (
                        <div className="p-3 text-sm text-gray-600">No matches found</div>
                    )}
                </div>
            )}
        </div>
    );
}