import React from 'react';
import Header from './components/Header';
import Items from './components/Items';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useDispatch, useSelector} from 'react-redux';
import { ProductState } from './redux/model/product';
import { getProducts } from './redux/effects/product.effects';
import { getCartById } from './redux/effects/cart.effects';
import { UPDATE_CART } from './redux/actions/cart.actions';

function App() {

  axios.defaults.baseURL = 'http://localhost:8080';

  const dispatch = useDispatch();
  const data: ProductState = useSelector((state: any) => state.products);

  const { loading, products } = data;

  React.useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  const cartId = Cookies.get('cartId');
  if (cartId) {
    dispatch(getCartById(cartId));
  } else {
    dispatch({type: UPDATE_CART, payload: {items: [], total: 0}});
  }

  return (
    <div className="App">
      <Header />
      <Items loading={loading} products={products} />
    </div>
  );
}

export default App;
