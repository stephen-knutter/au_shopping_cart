import { Product } from './product'

export interface CartItem {
  count: number;
  product: Product;
}

export interface Cart {
  _id?: string;
  total: number;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartState {
  cart: Cart;
}