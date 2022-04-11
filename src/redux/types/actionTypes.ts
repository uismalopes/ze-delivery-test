import { IMapBoxResponseSearch } from "src/types";
import { IProductsResponse } from "src/types/IPocProducts";

export enum ActionType {
  SET_ADDRESS,
  SET_SELECTED_POINT,
  SET_LOADING,
  SET_IS_PAGE_PRODUCT,
  SET_ITEM_IN_BAG,
}

interface ISetAddress {
  type: ActionType.SET_ADDRESS;
  payload: IMapBoxResponseSearch;
}

interface ISetSelectedPoint {
  type: ActionType.SET_SELECTED_POINT;
  payload: IProductsResponse;
}

interface ISetLoading {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

interface ISetIsPageProduct {
  type: ActionType.SET_IS_PAGE_PRODUCT;
  payload: boolean;
}

interface ISetItemInBag {
  type: ActionType.SET_ITEM_IN_BAG;
  payload: number;
}

export type IAction =
  | ISetAddress
  | ISetSelectedPoint
  | ISetLoading
  | ISetIsPageProduct
  | ISetItemInBag;
