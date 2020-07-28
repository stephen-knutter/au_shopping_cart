import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/product.reducer';
import cartReducer from './reducers/cart.reducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  cart: cartReducer,
  products: productReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), ((window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f))
);

export default store;