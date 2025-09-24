"use client"

import { cls } from "@/lib/ui"
import { Search } from "lucide-react"

export default function SearchBar() {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 "/>
            <input
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