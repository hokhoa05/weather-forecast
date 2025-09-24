"use client"

import { useDebounced } from "@/lib/hooks";
import { mockGeocode } from "@/lib/mock-data";
import { cls } from "@/lib/ui"
import { Search } from "lucide-react"
import { useEffect, useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const debounced = useDebounced(query, 300);

    useEffect(() => {
        let cancelled = false;
        const q = debounced.trim();
        if(!q) return;

        (async () => {
            console.log("[geocode:start]", q);
            try {
                const results = await mockGeocode(q);
                if(!cancelled) console.log("[geocode:results]", results);
            } catch (error) {
                if(!cancelled) console.error("[geocode:error]", error);
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
            />
        </div>
    );
}