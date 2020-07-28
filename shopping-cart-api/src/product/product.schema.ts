import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  title: { type: String, required: 'Title must not be blank' },
  description: { type: String, required: 'Description must not be blank' },
  image: { type: String, required: 'Image must not be blank' },
  price: { type: Number, required: 'Price must not be blank' }
});

export const ProductToken = 'Product';