import { UPDATE_CART } from '../actions/cart.actions';
import { CartActions } from '../actions/cart.actions';
import { Cart } from '../model/cart';
import Cookies from 'js-cookie';

export const initialState = {
  total: 0,
  items: null
};

export default function cartReducer(state = initialState, action: CartActions) {
  switch (action.type) {
    case UPDATE_CART:
      const cart: Cart = action.payload;
      const { _id } = cart;
      if (_id) {
        Cookies.set('cartId', _id, {path: '/'});
      }
      return {
        ...state,
        _id: cart._id,
        total: cart.total,
        items: [...cart.items],
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    default:
      return state;
  }
}