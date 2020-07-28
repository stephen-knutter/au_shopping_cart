import { Cart } from '../model/cart';

export const UPDATE_CART = '[Cart] update';

export interface UpdateCart {
  type: typeof UPDATE_CART;
  payload: Cart;
}

export type CartActions = UpdateCart;