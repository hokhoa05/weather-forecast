import CityPage from "@/components/city-client";
import type { Units } from "@/lib/format";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    lat?: string;
    lon?: string;
    units?: string;
  }>;
}) {
  const sp = await searchParams;

  const name = sp?.name ?? "Unknown";
  const latNum = Number(sp?.lat);
  const lonNum = Number(sp?.lon);
  const units = (sp?.units === "imperial" ? "imperial" : "metric") as Units;

  return <CityPage name={name} latNum={latNum} lonNum={lonNum} units={units} />;
}