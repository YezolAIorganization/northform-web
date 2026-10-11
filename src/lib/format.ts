const TZ = "America/New_York";

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(iso));
}

export function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}
export function dayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(
    new Date(iso),
  );
}

export function formatDayLong(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}