import { Module } from '@nestjs/common';
import { ProductsService } from './carts.service';
import { ProductsController } from './carts.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
