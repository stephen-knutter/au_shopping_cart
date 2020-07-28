import { Types } from 'mongoose';
import { CartDto } from '../cart.model';

export const CartMock = {
  _id: '1',
  total: 64999,
  items: [
    {
      count: 1,
      product: '5f1f163307bdc6ec9bfa0e9a'
    },
  ]
}

export const CartDtoMock = {
  cartId: '1',
  count: 1,
  product: {
    "title": "Volkl Revolt 121 Skis 2021",
    "description": "Three radii in one ski shape deliver maximum versatility - long radii at the tip and tail for stability and smoothness, and a short radius in the mid-body allows the skier to switch from long arcs to short turns at will, at any speed.",
    "image": "https://images.evo.com/imgp/250/183427/726974/volkl-revolt-121-skis-2021-.jpg",
    "price": 64999
  }
}