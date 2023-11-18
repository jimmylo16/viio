import { Injectable } from '@nestjs/common';
import { Carts } from './interfaces/Carts';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Carts[]> {
    const products = await this.httpService.axiosRef.get<Carts[]>(
      'https://dummyjson.com/carts',
    );
    return products.data;
  }

  async findOne(id: number): Promise<Carts> {
    const product = await this.httpService.axiosRef.get<Carts>(
      `https://dummyjson.com/carts/${id}`,
    );
    return product.data;
  }
}
