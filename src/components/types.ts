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
