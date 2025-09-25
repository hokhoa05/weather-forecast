export type Units = "metric" | "imperial";

export function cToF(c: number) { return c * 9/5 + 32; }
export function fToC(f: number) { return (f - 32) * 5/9; }

export function formatTemp(t: number, units: Units) {
    const v = (units === "imperial") ? cToF(t) : t;
    return `${Math.round(v)}°`;
}

export function kphToMph(k: number) { return k * 0.621371; }
export function formatWind(t: number, units: Units) {
    const v = (units === "imperial") ? kphToMph(t) : t;
    return `${Math.round(v)} ${(units === "imperial") ? "mph" : "km/h"}`;
}

export function formatTime(iso: string, tz: string, pattern: "HH:mm" | "EEE d MMM" = "HH:mm") {
    const d = new Date(iso);
    const opts: Intl.DateTimeFormatOptions = 
        pattern === "HH:mm"
            ? { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz}
            : { weekday: "short", day: "numeric", month: "short", timeZone: tz};
    return new Intl.DateTimeFormat(undefined, opts).format(d);
}