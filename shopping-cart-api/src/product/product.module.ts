import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductToken, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ProductToken,
          schema: ProductSchema
        }
      ]
    )
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
