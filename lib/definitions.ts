export type GeoResult = {
    id: string;
    name: string;
    country?: string;
    lat: number;
    lon: number;
};

export type Current = {
    at: string;
    temp: number;
    feelsLike: number;
    icon: string;
    summary: string;
    humidity: number;
    windKph: number;
    windDir: number;
    uvi: number;
};

export type HourPoint = {
    at: string;
    temp: number;
    pop: number;
    icon: string;
};

export type DayPoint = {
    date: string;
    tMin: number;
    tMax: number;
    sunrise: string;
    sunset: string;
    pop: number;
    iconDay: string;
    iconNight: string;
};

export type Forecast = {
    location: {
        name: string;
        lat: number;
        lon: number;
        tz: string;
    };
    current: Current;
    hourly: HourPoint[];
    daily: DayPoint[];
}