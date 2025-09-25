'use client';

import { GeoResult } from "@/lib/definitions";
import { MapPin, X } from "lucide-react";

export default function RecentChips({
    items,
    onSelect,
    onRemove,
}: {
    items: GeoResult[];
    onSelect: (c: GeoResult) => void;
    onRemove: (id: string) => void;
}) {
    if(!items.length) return null;
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((r) => (
                <div
                    key={r.id}
                    className="group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 bg-white"
                >
                    <button onClick={() => onSelect(r)} className="inline-flex items-center gap-1">   
                        <MapPin className="h-4 w-4"/>
                        <span className="text-sm">{r.name}</span>
                    </button>
                    <button
                        onClick={() => onRemove(r.id)}
                        className="opacity-0 group-hover:opacity-100 transition"
                        aria-label={`Remove ${r.name}`}
                    >
                        <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600"/>
                    </button>
                </div>
            ))}
        </div>
    )
}