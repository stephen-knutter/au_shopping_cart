import { Schema } from 'mongoose';

export const CartSchema = new Schema({
  total: { type: Number },
  items: [
    {
      count: { type: Number, default: 1 },
      product: { type: Schema.Types.ObjectId, ref: 'Product' }
    }
  ]
}, {timestamps: true});

export const CartToken = 'Cart';