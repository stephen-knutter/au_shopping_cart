import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ProductToken } from './product.schema';
import { Product } from './product.model';

@Injectable()
export class ProductService {

  constructor(@InjectModel(ProductToken) private productModel: Model<Product>) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productModel.find({}).exec();
    return products;
  }
}