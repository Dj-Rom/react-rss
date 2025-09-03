export type YearRow = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  iso_code?: string;
  region?: string;
  [k: string]: number | string | undefined;
};

export type CountrySeries = YearRow[];
export type CO2Data = Record<string, CountrySeries>;

export type SortKey = 'name' | 'population';
export type SortDir = 'asc' | 'desc';
