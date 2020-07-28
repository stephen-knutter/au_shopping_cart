import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto, Cart } from './cart.model';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async getCartById(@Param('id') cartId: string): Promise<Cart> {
    try {
      return await this.cartService.getCartById(cartId);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    
  }

  @Post('/')
  async addCartItem(@Body() cartDto: CartDto): Promise<Cart> {
    try {
      const cartItem = await this.cartService.getCartItem(cartDto);
      if (cartItem) {
        return await this.cartService.updateCartItem(cartDto);
      }
      return await this.cartService.addCartItem(cartDto);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/new')
  async createCart(@Body() cartDto: CartDto): Promise<Cart> {
    try {
      return await this.cartService.createCart(cartDto);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/update/add')
  async updateCartItemAdd(@Body() cartDto: CartDto): Promise<Cart> {
    try {
      return await this.cartService.updateItem(cartDto, 1);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/update/remove')
  async updateCartItemRemove(@Body() cartDto: CartDto): Promise<Cart> {
    try {
      return await this.cartService.updateItem(cartDto, -1);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/update/delete')
  async updateCartItemDelete(@Body() cartDto: CartDto): Promise<Cart> {
    try {
      return await this.cartService.deleteItem(cartDto);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}