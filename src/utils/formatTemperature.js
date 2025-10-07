export function formatCelsius(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${Math.round(value)}°C`;
}
