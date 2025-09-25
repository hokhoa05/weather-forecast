import { GeoResult } from "../definitions";
import { fetchOpenMeteoGeocode } from "./client";
import { mapToGeoResults } from "./transform";

export async function geocodeName(q: string, limit = 6) : Promise<GeoResult[]> {
    const trimmed = q.trim();
    if(!trimmed) return [];
    const res = await fetchOpenMeteoGeocode(trimmed, limit);
    return mapToGeoResults(res);
}