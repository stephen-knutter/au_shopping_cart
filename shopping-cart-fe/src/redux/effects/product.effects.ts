import axios from 'axios';
import { LOADING_PRODUCTS, SET_PRODUCTS, ERROR_PRODUCTS } from '../actions/product.actions';

export const getProducts = () => (dispatch: any) => {
  dispatch({ type: LOADING_PRODUCTS });
  axios.get('/products')
    .then(res => {
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data
      })
    })
    .catch((err) => dispatch({ type: ERROR_PRODUCTS, payload: err.response }));
};