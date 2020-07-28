import { Product } from '../model/product';

export const LOADING_PRODUCTS= '[Product] loading';
export const SET_PRODUCTS = '[Product] set';

export interface LoadingProductsAction {
  type: typeof LOADING_PRODUCTS
}

export interface SetProductsAction {
  type: typeof SET_PRODUCTS
  payload: Product[]
}

export type ProductActions = LoadingProductsAction | SetProductsAction;
