import { GeoResult } from "../definitions";

export async function fetchGeocode(q: string, limit = 6): Promise<GeoResult[]> {
    const url = new URL("api/geocode", window.location.origin);
    url.searchParams.set("q", q);
    url.searchParams.set("limit", String(limit));
    const res = await fetch(url.toString(), {cache: "force-cache"});
    if(!res.ok) throw Error(`Geocode failed: ${res.status}`);
    return res.json() as Promise<GeoResult[]>;
}