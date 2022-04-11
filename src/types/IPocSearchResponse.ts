export interface IPocSearch {
  id: string;
  status: string;
  name: string;
}

export interface IPocSearchResponse {
  pocSearch: IPocSearch[];
}
