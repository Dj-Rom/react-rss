export type YearlyData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | string | undefined;
};

export type CountryData = {
  iso_code?: string;
  data: YearlyData[];
  [key: string]: any;
};

export type Co2Dataset = {
  [country: string]: CountryData;
};

type Status = 'pending' | 'success' | 'error';

function createResource<T>(promise: Promise<T>) {
  let status: Status = 'pending';
  let result: T;
  let error: any;

  const suspender = promise
    .then((r) => {
      status = 'success';
      result = r;
    })
    .catch((e) => {
      status = 'error';
      error = e;
    });

  return {
    read(): T {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return result!;
    },
  };
}

const DATA_URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

async function fetchCo2Data(): Promise<Co2Dataset> {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error('Failed to fetch CO2 dataset');
  return (await res.json()) as Co2Dataset;
}

export const co2DataResource = createResource<Co2Dataset>(fetchCo2Data());
