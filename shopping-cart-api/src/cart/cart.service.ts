import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartToken } from './cart.schema';
import { Cart, CartDto } from './cart.model';

@Injectable()
export class CartService {

  constructor(@InjectModel(CartToken) private cartModel: Model<Cart>) {}

  async getCartById(cartId: string): Promise<Cart> {
    return await this.cartModel
      .findOne({ _id: Types.ObjectId(cartId) })
      .populate('items.product')
      .exec();
  }

  async getCartItem(cartDto: CartDto): Promise<Cart> {
    const { cartId, product } = cartDto;
    const cart = await this.cartModel
      .findOne({
        _id: Types.ObjectId(cartId),
        'items.product': Types.ObjectId(product._id)
      })
      .exec();
    return cart;
  }

  async updateCartItem(cartDto: CartDto): Promise<Cart> {
    const { cartId, product } = cartDto;
    const cart = await this.cartModel
      .findOneAndUpdate(
        {
          _id: Types.ObjectId(cartId),
          'items.product': Types.ObjectId(product._id)
        },
        { $inc: { 'items.$.count': 1, total: product.price } },
        { new: true }
      )
      .populate('items.product')
      .exec();
    return cart;
  }

  async addCartItem(cartDto: CartDto): Promise<Cart> {
    const { cartId, product } = cartDto;
    const cart = await this.cartModel
      .findOneAndUpdate(
        { _id: Types.ObjectId(cartId)},
        { $push:  { items: { count: 1, product: product._id } }, $inc: { total: product.price }},
        { new: true }
      )
      .populate('items.product')
      .exec();
    return cart;
  }

  async createCart(cartDto: CartDto): Promise<Cart> {
    const { product } = cartDto;
    const newCart = new this.cartModel({
      total: product.price,
      items: [
        {
          count: 1,
          product: product._id
        }
      ]
    });
    const cartDoc: Cart = await newCart.save();
    const cart = cartDoc.toJSON();
    cart.items[0].product = product;
    return cart;
  }

  async updateItem(cartDto: CartDto, inc: number): Promise<Cart> {
    const { cartId, product } = cartDto;
    const cart = await this.cartModel
      .findOneAndUpdate(
        {
          _id: Types.ObjectId(cartId),
          'items.product': Types.ObjectId(product._id)
        },
        { $inc: {'items.$.count': inc, total: product.price * inc } },
        { new: true }
      )
      .populate('items.product')
      .exec();
    return cart;
  }

  async deleteItem(cartDto: CartDto): Promise<Cart> {
    const { cartId, product, count } = cartDto;
    const cart = await this.cartModel
      .findOneAndUpdate(
        { _id: Types.ObjectId(cartId) },
        {
          $pull: { items: { product: Types.ObjectId(product._id)} },
          $inc: { total: product.price * count * -1 }
        },
        { new: true }
      )
      .populate('items.product')
      .exec();
    return cart;
  }
}