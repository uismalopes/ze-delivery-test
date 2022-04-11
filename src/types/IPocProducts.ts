export interface IProduct {
  id: string;
  image: string;
  price: number;
  title: string;
  category: {
    id: string;
    title: string;
  };
}

export interface IProductsResponse {
  id: string;
  name: string;
  status: string;
  products: IProduct[];
}
