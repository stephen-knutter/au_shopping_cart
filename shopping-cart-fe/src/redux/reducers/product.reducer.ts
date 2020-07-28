import { LOADING_PRODUCTS, SET_PRODUCTS } from '../actions/product.actions';
import { ProductActions } from '../actions/product.actions';

export const initialState = {
  loading: false,
  products: [],
};

export default function productReducer(state = initialState, action: ProductActions) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    default:
      return state;
  };
}
