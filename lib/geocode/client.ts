export type OMGeoItem = {
    id: number;
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
};

export type OMGeoResponse = {
    results?: OMGeoItem[];
};

export async function fetchOpenMeteoGeocode(q: string, count = 6) : Promise<OMGeoResponse> {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", q);
    url.searchParams.set("count", String(count));
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");
    const res = await fetch(url.toString(), {cache: "no-store"});
    if(!res.ok) throw Error(`Geocode upstream error: ${res.status}`);
    return res.json() as Promise<OMGeoResponse>;
}