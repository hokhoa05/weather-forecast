import { Forecast } from "@/lib/definitions";
import { OMResponse } from "@/lib/openmeteo/client";

export function wmoSummary(code: number): string {
    const map: Record<number, string> = {
        0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Rime fog",
        51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
        56: "Freezing drizzle", 57: "Freezing drizzle",
        61: "Light rain", 63: "Rain", 65: "Heavy rain",
        71: "Light snow", 73: "Snow", 75: "Heavy snow",
        77: "Snow grains",
        80: "Rain showers", 81: "Rain showers", 82: "Violent rain showers",
        85: "Snow showers", 86: "Snow showers",
        95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm with hail",
    };
    return map[code] ?? "Clear";
}

export function toIcon(code: number, isDay: boolean): string {
    if ([0, 1, 2].includes(code)) return isDay ? "01d" : "01n";
    if (code === 3) return isDay ? "03d" : "03n";
    if ([45,48].includes(code)) return isDay ? "50d" : "50n";
    if ([51,53,55,56,57].includes(code)) return "09d";
    if ([61,63,65,80,81,82].includes(code)) return "10d";
    if ([71,73,75,77,85,86].includes(code)) return "13d";
    if ([95,96,99].includes(code)) return isDay ? "11d" : "11n";
    return isDay ? "01d" : "01n";
}

export function mapToDTO(data: OMResponse, lat: number, lon: number, name: string): Forecast {
    const tz = data.timezone || "UTC";
    const hourly = data.hourly.time.map((t, i) => ({
      at: t,
      temp: data.hourly.temperature_2m[i],
      pop: data.hourly.precipitation_probability[i] ?? 0,
      icon: toIcon(data.hourly.weather_code[i] ?? 0, true),
    })).slice(0, 24);
  
    const daily = data.daily.time.map((d, i) => ({
      date: d,
      tMin: data.daily.temperature_2m_min[i],
      tMax: data.daily.temperature_2m_max[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
      pop: data.daily.precipitation_probability_max[i] ?? 0,
      iconDay: toIcon((data.hourly.weather_code[i * 3] ?? 0), true),
      iconNight: toIcon((data.hourly.weather_code[i * 3 + 1] ?? 0), false),
    }));
  
    const codeNow = data.hourly.weather_code[0] ?? 0;
  
    return {
      location: { name, lat, lon, tz },
      current: {
        at: data.current.time,
        temp: data.current.temperature_2m,
        feelsLike: data.current.temperature_2m, 
        icon: toIcon(codeNow, true),
        summary: wmoSummary(codeNow),
        humidity: data.current.relative_humidity_2m,
        windKph: data.current.wind_speed_10m,
        windDir: data.current.wind_direction_10m,
        uvi: 0,
      },
      hourly,
      daily,
    };
}