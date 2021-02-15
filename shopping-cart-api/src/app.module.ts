import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from '@app/db/dbconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    // CartModule,
    // ProductModule,
    // MongooseModule.forRoot(database.connection, {useFindAndModify: false})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}