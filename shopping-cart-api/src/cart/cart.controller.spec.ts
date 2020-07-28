import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartServiceMock } from './__mocks__/cart.service.mock';
import { CartMock, CartDtoMock } from './__mocks__/cart.mock';
import { CartDto, Cart } from './cart.model';

describe('ProductController', () => {

  let app: INestApplication;
  let cartService: CartService;
  let cartController: CartController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        { provide: CartService, useClass: CartServiceMock }
      ]
    })
    .compile();

    app = module.createNestApplication();
    await app.init();
    cartController = app.get<CartController>(CartController);
    cartService = app.get<CartService>(CartService);
  });

  it('should return cart', async () => {
    jest.spyOn(cartService, 'getCartById').mockReturnValue(Promise.resolve(CartMock as Cart));

    return await request(app.getHttpServer())
      .get('/cart/5f1f163307bdc6ec9bfa0e9a')
      .expect(200);
  });

  it('should return an error if cart not found', async () => {
    jest.spyOn(cartService, 'getCartById').mockRejectedValue(new Error('Cart not found'));

    return await request(app.getHttpServer())
      .get('/cart/123456')
      .expect(400);
  });

  it('should update item count if product is already in the cart', async () => {
    jest.spyOn(cartService, 'getCartItem').mockReturnValue(Promise.resolve(CartMock as Cart));
    const updateSpy = jest.spyOn(cartService, 'updateCartItem').mockReturnValue(Promise.resolve(CartMock as Cart));

    await cartController.addCartItem(CartDtoMock as CartDto);

    expect(updateSpy).toHaveBeenCalled();
  });

  it('should add item if product is NOT in the cart', async () => {
    jest.spyOn(cartService, 'getCartItem').mockReturnValue(Promise.resolve(null));
    const addSpy = jest.spyOn(cartService, 'addCartItem').mockReturnValue(Promise.resolve(CartMock as Cart));

    await cartController.addCartItem(CartDtoMock as CartDto);

    expect(addSpy).toHaveBeenCalled();
  });
});
