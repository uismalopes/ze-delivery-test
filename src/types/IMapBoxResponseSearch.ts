export interface IMapBoxResponseSearch {
  pocId?: string;
  address?: string;
  geometry: {
    coordinates: number[];
  };
  id: string;
  text: string;
  place_name: string;
}
