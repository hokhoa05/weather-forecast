import HomePage from "@/components/home-client";
import type { Units } from "@/lib/format";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ units?: string }>;
}) {
  const sp = await searchParams;
  const units = (sp?.units === "imperial" ? "imperial" : "metric") as Units;
  return <HomePage units={units} />;
}