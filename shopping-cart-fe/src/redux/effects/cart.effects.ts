import axios from 'axios';
import { UPDATE_CART } from '../actions/cart.actions';
import { Product } from '../model/product';

export const getCartById = (cartId: string) => (dispatch: any) => {
  axios.get(`/cart/${cartId}`)
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      })
    });
}

export const createNewCart = (product: Product) => (dispatch: any) => {
  axios.post('/cart/new', { product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    });
}

export const addItemToCart = (product: Product, cartId: string) => (dispatch: any) => {
  axios.post('/cart', { cartId, product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    });
}

export const updateCartItemAdd = (product: Product, cartId: string) => (dispatch: any) => {
  axios.post('/cart/update/add', { cartId, product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    });
}

export const updateCartItemRemove = (product: Product, cartId: string) => (dispatch: any) => {
  axios.post('/cart/update/remove', { cartId, product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    });
}

export const removeCartItem = (product: Product, cartId: string, count: number) => (dispatch: any) => {
  axios.post('/cart/update/delete', { cartId, product, count })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    });
} 