import { Units } from "./format";

const UNIT_KEY = "wx_units_pref_v1";

export function readUnitsPref(): Units | null {
    if(typeof window === "undefined") return null;
    const v = localStorage.getItem(UNIT_KEY);
    return (v === "imperial" ? "imperial" : v === "metric" ? "metric" : null);
}

export function writeUnitsPref(u: Units) {
    if(typeof window === "undefined") return;
    localStorage.setItem(UNIT_KEY, u);
}