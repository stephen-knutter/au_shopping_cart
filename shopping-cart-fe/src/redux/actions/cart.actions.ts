import { Cart } from '../model/cart';

export const UPDATE_CART = '[Cart] update';
export const ERROR_CART = '[Cart] error';

export interface UpdateCart {
  type: typeof UPDATE_CART;
  payload: Cart;
}

export interface ErrorCart {
  type: typeof ERROR_CART;
  payload: any;
}

export type CartActions = UpdateCart | ErrorCart;