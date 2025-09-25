import { geocodeName } from "@/lib/geocode";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const limit = Number(searchParams.get("limit") ?? 6);

    if (!q.trim()) {
        return NextResponse.json([], { headers: { "Cache-Control": "public, max-age=600" } });
    }
    
    try {
    const results = await geocodeName(q, Number.isFinite(limit) ? limit : 6);
    return NextResponse.json(results, {
        headers: { "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=600` },
    });
    } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Geocode failed" }, { status: 502 });
    }
}