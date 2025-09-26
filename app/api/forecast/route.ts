import { NextResponse } from "next/server";
import { getForecast } from "@/lib/openmeteo";

export const runtime = "edge";
export const revalidate = 600;

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));
    const name = searchParams.get("name") ?? "Unknown";

    if(!Number.isFinite(lat) || !Number.isFinite(lon)) {
        return NextResponse.json({error: "Invalid lat/lon"}, {status: 400});
    }

    try {
        const dto = await getForecast(lat, lon, name);
        return NextResponse.json(dto, {
            headers: {
                "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=60`
            }
        })
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Upstream error";
        return NextResponse.json({ error: msg }, { status: 502 });
    }
}