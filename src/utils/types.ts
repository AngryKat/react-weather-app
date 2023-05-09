export type CityId = number;
export interface Coords {
  lat: number;
  lon: number;
}
export interface City {
  id: number;
  name: string;
  countryCode: string;
  coords: Coords;
}

export enum FetchStatus {
  "idle",
  "loading",
  "succeeded",
  "failed",
}

export interface CityGeoDB {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  countryCode: string;
}
