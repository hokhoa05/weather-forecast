import { Forecast } from "./definitions";

function iso(hoursFromNow = 0) {
    const d = new Date(Date.now() + hoursFromNow * 3600_000);
    return d.toISOString();
}

export async function fetchMockForecast(lat: number, lon: number, name="Unknown") : Promise<Forecast> {
    await new Promise(r => setTimeout(r, 400)); // simulate

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const base = 30 - Math.abs(lat) * 0.05;
    const hourly = Array.from({length: 24}, (_, i) =>({
        at: iso(i),
        temp: Math.round((base + Math.sin(i / 24 * Math.PI * 2) * 5)* 10) / 10,
        pop: Math.max(0, Math.round((Math.sin((i+4)/24*Math.PI*2)*0.5+0.5)*100)),
        icon: i >= 6 && i <= 18 ? "01d" : "01n",
    }));

    const daily = Array.from({ length: 7 }, (_, i) => {
        const t = base + Math.sin(i / 7 * Math.PI * 2) * 3;
        return {
            date: iso(i * 24),
            tMin: Math.round((t - 3) * 10) / 10,
            tMax: Math.round((t + 3) * 10) / 10,
            sunrise: iso(i * 24 + 6),
            sunset: iso(i * 24 + 18),
            pop: [30, 40, 20, 50, 10, 60, 35][i],
            iconDay: "01d",
            iconNight: "01n",
        };
    });

    return {
        location: { name, lat, lon, tz },
        current: {
          at: iso(),
          temp: hourly[0].temp,
          feelsLike: hourly[0].temp - 0.5,
          icon: hourly[0].icon,
          summary: "Clear",
          humidity: 55,
          windKph: 14,
          windDir: 90,
          uvi: 7,
        },
        hourly,
        daily,
    };
}