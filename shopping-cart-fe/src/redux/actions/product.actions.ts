import { Product } from '../model/product';

export const LOADING_PRODUCTS= '[Product] loading';
export const SET_PRODUCTS = '[Product] set';
export const ERROR_PRODUCTS = '[Product] error';

export interface LoadingProductsAction {
  type: typeof LOADING_PRODUCTS;
}

export interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: Product[];
}

export interface ErrorProductsAction {
  type: typeof ERROR_PRODUCTS;
  payload: any;
}

export type ProductActions = LoadingProductsAction | SetProductsAction;
