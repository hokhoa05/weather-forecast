export type OMCurrent = {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    relative_humidity_2m: number;
};

export type OMHourly = {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
};

export type OMDaily = {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max: number[];
};

export type OMResponse = {
    timezone: string;
    current: OMCurrent;
    hourly: OMHourly;
    daily: OMDaily;
};

export async function fetchOpenMeteo(lat: number, lon: number) : Promise<OMResponse>{
    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),
        current: [
            "temperature_2m",
            "wind_speed_10m",
            "wind_direction_10m",
            "relative_humidity_2m"
        ].join(","),
        hourly: [
            "temperature_2m", 
            "precipitation_probability", 
            "weather_code"
        ].join(","),
        daily: [
            "temperature_2m_max", 
            "temperature_2m_min", 
            "sunrise", 
            "sunset", 
            "precipitation_probability_max"
        ].join(","),
        timezone: "auto"
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    const res = await fetch(url, {cache: "no-store"});
    if(!res.ok) throw new Error(`Open-Meteo upstream error: ${res.status}`);
    return res.json() as Promise<OMResponse>;
}