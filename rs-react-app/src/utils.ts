export const formatNumber = (n: number | undefined) =>
  typeof n === 'number' && Number.isFinite(n) ? n.toLocaleString() : 'N/A';

export const getLatestRow = (series: { year: number }[]) =>
  series.reduce(
    (acc, r) => (r.year > (acc?.year ?? -Infinity) ? r : acc),
    undefined as any
  );

export function getValueForYear(series: any[], year: number, key: string) {
  const row = series.find((r) => r.year === year);
  const v = row?.[key];
  return (typeof v === 'number' && Number.isFinite(v)) || typeof v === 'string'
    ? v
    : 'N/A';
}

export const unique = <T>(arr: T[]) => Array.from(new Set(arr));
