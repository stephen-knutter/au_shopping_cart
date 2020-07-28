import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductServiceMock } from './__mocks__/product.service.mock';
import products from '../db/products.json';
import { Product } from './product.model';

describe('ProductController', () => {

  let app: INestApplication;
  let productService: ProductService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useClass: ProductServiceMock }
      ]
    })
    .compile();

    app = module.createNestApplication();
    await app.init();
    productService = app.get<ProductService>(ProductService);
  });

  it('should return products', async () => {
    jest.spyOn(productService, 'getAll').mockReturnValue(Promise.resolve(products as Product[]));

    return await request(app.getHttpServer())
      .get('/products')
      .expect(200);
  });

  it('shoudl catch error', async () => {
    jest.spyOn(productService, 'getAll').mockRejectedValue(new Error('Fetch products error'));

    return await request(app.getHttpServer())
      .get('/products')
      .expect(400);
  });
});
