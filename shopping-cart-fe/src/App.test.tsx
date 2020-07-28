import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_PRODUCTS } from './redux/actions/product.actions';
import { products } from './__mocks__/product.mock';
import { UPDATE_CART } from './redux/actions/cart.actions';

test('render home page with products', () => {
  
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const title = getByText(/OutdoorStuff\.com/i);
  expect(title).toBeInTheDocument();

  store.dispatch({type: UPDATE_CART, payload: {
    total: 0,
    items: []
  }});

  const message = getByText(/Your cart is empty/i);
  expect(message).toBeInTheDocument();

  store.dispatch({type: SET_PRODUCTS, payload: products });

  const itemTitle = products[0].title;
  expect(getByText(itemTitle)).toBeInTheDocument();
});

test('should add items to cart', () => {

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  store.dispatch({type: UPDATE_CART, payload: {
    _id: "123",
    total: products[0].price,
    items: [{count: 1, product: products[0]}],
    createdAt: '2020-07-27T18:00:55.671Z',
    updatedAt: '2020-07-27T18:00:55.671Z'
  }});

  const message = getByText(/Cart/);
  expect(message).toBeInTheDocument();

  const cartTotalWithItems = getByText(/TOTAL: \$3,199\.99/i);
  expect(cartTotalWithItems).toBeInTheDocument();

  store.dispatch({type: UPDATE_CART, payload: {
    total: 0,
    items: []
  }});

  const cartTotalWithoutItems = getByText(/TOTAL: \$0\.00/);
  expect(cartTotalWithoutItems).toBeInTheDocument();
});