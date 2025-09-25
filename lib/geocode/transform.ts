import { GeoResult } from "../definitions";
import { OMGeoResponse } from "./client";

export function mapToGeoResults(res: OMGeoResponse): GeoResult[] {
    const items = res.results ?? [];
    return items.map((r) => ({
        id: String(r.id),
        name: r.name,
        country: r.country,
        lat: r.latitude,
        lon: r.longitude,
    }));
}

