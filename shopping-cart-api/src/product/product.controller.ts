import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(): Promise<Product[]> {
    try {
      const products: any = await this.productService.getAll();
      return products;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}