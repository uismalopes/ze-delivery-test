import { IProduct } from "./IPocProducts";

export interface IValuesCategoryWithProducts {
  title: string;
  data: IProduct[];
}

export interface ICategoryWithProducts {
  [key: string]: IValuesCategoryWithProducts;
}
