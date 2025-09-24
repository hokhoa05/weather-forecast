import { GeoResult } from "./definitions";

export const MOCK_CITIES: GeoResult[] = [
    { id: "paris",  name: "Paris",              country: "FR", lat: 48.8566, lon:   2.3522 },
    { id: "london", name: "London",             country: "GB", lat: 51.5072, lon:  -0.1276 },
    { id: "tokyo",  name: "Tokyo",              country: "JP", lat: 35.6762, lon: 139.6503 },
    { id: "hanoi",  name: "Hanoi",              country: "VN", lat: 21.0278, lon: 105.8342 },
    { id: "saigon", name: "Ho Chi Minh City",   country: "VN", lat: 10.8231, lon: 106.6297 },
    { id: "nyc",    name: "New York",           country: "US", lat: 40.7128, lon: -74.0060 },
    { id: "sydney", name: "Sydney",             country: "AU", lat: -33.8688, lon: 151.2093 },
];

export async function mockGeocode(q: string): Promise<GeoResult[]> {
    if(!q.trim()) return [];
    await new Promise((r) => setTimeout(r, 200)); // simulate the delay

    const s = q.trim().toLowerCase();
    return MOCK_CITIES
        .filter(c => c.name.toLowerCase().includes(s) || c.country?.toLocaleLowerCase().includes(s))
        .slice(0, 6);
}