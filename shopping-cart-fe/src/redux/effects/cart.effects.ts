import axios from 'axios';
import { UPDATE_CART, ERROR_CART } from '../actions/cart.actions';
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
    })
    .catch((err) => dispatch({ type: ERROR_CART, payload: err.resonse }));
}

export const addItemToCart = (product: Product, cartId: string) => (dispatch: any) => {
  axios.post('/cart', { cartId, product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    })
    .catch((err) => dispatch({ type: ERROR_CART, payload: err.response }));
}

export const updateCartItemAdd = (product: Product, cartId: string) => (dispatch: any) => {
  axios.post('/cart/update/add', { cartId, product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    })
    .catch((err) => dispatch({ type: ERROR_CART, payload: err.response }));
}

export const updateCartItemRemove = (product: Product, cartId: string) => (dispatch: any) => {
  axios.post('/cart/update/remove', { cartId, product })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    })
    .catch((err) => dispatch({ type: ERROR_CART, payload: err.response }));
}

export const removeCartItem = (product: Product, cartId: string, count: number) => (dispatch: any) => {
  axios.post('/cart/update/delete', { cartId, product, count })
    .then(res => {
      dispatch({
        type: UPDATE_CART,
        payload: res.data
      });
    })
    .catch((err) => dispatch({ type: ERROR_CART, payload: err.response }));
} 