import { Document, Types } from 'mongoose';
import { Product } from '../product/product.model';

export interface CartDto {
  cartId?: string;
  count?: number;
  product: Product;
}

export interface CartItem {
  count: number;
  product: Product | Types.ObjectId | string;
}

export interface Cart extends Document {
  total: number;
  items: CartItem[]
}