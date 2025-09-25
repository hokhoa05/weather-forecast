import { GeoResult } from "./definitions";

const RECENT_KEY = "wx_recent_cities_v1";

function read(): GeoResult[] {
    
    console.log(window);
    if(typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
    catch { return []; }
}

function write(list: GeoResult[]) {
    console.log(typeof window);
    if(typeof window === "undefined") return;
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 8)));
}

export function readRecent(): GeoResult[] { return read(); }

export function upsertRecent(city: GeoResult) {
    const cur = read();
    const next = [city, ...cur.filter(r => r.id !== city.id)];
    write(next);
    return next;
}

export function removeRecent(id: string) {
    const cur = read();
    const next = cur.filter(r => r.id !== id);
    write(next);
    return next;
}