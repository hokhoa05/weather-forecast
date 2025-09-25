import { Forecast } from "@/lib/definitions";
import { fetchOpenMeteo } from "@/lib/openmeteo/client";
import { mapToDTO } from "@/lib/openmeteo/transform";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export async function getForecast(lat: number, lon: number, name: string): Promise<Forecast> {
    const safeLat = clamp(lat, -90, 90);
    const safeLon = clamp(lon, -180, 180);
    const om = await fetchOpenMeteo(safeLat, safeLon);
    return mapToDTO(om, safeLat, safeLon, name || "Unknown");
}