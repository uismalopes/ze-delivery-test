import { IMapBoxResponseSearch } from "src/types";
import { IProductsResponse } from "src/types/IPocProducts";

import { IAction, ActionType } from "../types/actionTypes";

interface IState {
  address: IMapBoxResponseSearch;
  selectedPoint: IProductsResponse;
  loading: boolean;
  isPageProduct: boolean;
  totalItemInBag: number;
}

const initialState = {
  address: {},
  selectedPoint: {},
  loading: false,
  isPageProduct: false,
  totalItemInBag: 0,
} as IState;

export const reducer = (
  state: IState = initialState,
  action: IAction
): IState => {
  switch (action.type) {
    case ActionType.SET_ADDRESS:
      return { ...state, address: action.payload };
    case ActionType.SET_SELECTED_POINT:
      return { ...state, selectedPoint: action.payload };
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionType.SET_IS_PAGE_PRODUCT:
      return { ...state, isPageProduct: action.payload };
    case ActionType.SET_ITEM_IN_BAG:
      return { ...state, totalItemInBag: action.payload };
    default:
      return state;
  }
};
