export const cls = (...xs: Array<string | false | null | undefined>) =>
    xs.filter(Boolean).join(" ");