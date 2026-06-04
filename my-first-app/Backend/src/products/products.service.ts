import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(
      createProductDto,
    );

    return product.save();
  }

  async findAll(
    page = 1,
    limit = 10,
  ) {
    const skip = (page - 1) * limit;

    const products =
      await this.productModel
        .find()
        .skip(skip)
        .limit(limit);

    const total =
      await this.productModel.countDocuments();

    return {
      total,
      page,
      limit,
      products,
    };
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
  async seed() {
  const products = [
    {
      name: 'adidas-gazelle',
      brand: 'Adidas',
      category: 'shoes',
      image: 'adidas-gazelle.jpg',
      price: 9990,
      rating: 4.9,
    },
    {
      name: 'adidas-superstar',
      brand: 'Adidas',
      category: 'shoes',
      image: 'adidas-superstar.jpg',
      price: 10990,
      rating: 4.9,
    },
    {
      name: 'adidas-cloudfoam',
      brand: 'Adidas',
      category: 'shoes',
      image: 'adidas-cloudfoam.jpg',
      price: 7490,
      rating: 4.7,
    },
    {
      name: 'adidas-duramo',
      brand: 'Adidas',
      category: 'running',
      image: 'adidas-duramo.jpg',
      price: 8490,
      rating: 4.7,
    },
    {
      name: 'adidas-4dfwd',
      brand: 'Adidas',
      category: 'running',
      image: 'adidas-4dfwd.jpg',
      price: 18990,
      rating: 5,
    },
    {
      name: 'reebok-nanoflex',
      brand: 'Reebok',
      category: 'running',
      image: 'reebok-nanoflex.jpg',
      price: 8990,
      rating: 4.8,
    },
    {
      name: 'reebok-floatride',
      brand: 'Reebok',
      category: 'running',
      image: 'reebok-floatride.jpg',
      price: 11990,
      rating: 4.9,
    },
    {
      name: 'reebok-classic-black',
      brand: 'Reebok',
      category: 'shoes',
      image: 'reebok-classic-black.jpg',
      price: 6490,
      rating: 4.7,
    },
    {
      name: 'reebok-classic-green',
      brand: 'Reebok',
      category: 'shoes',
      image: 'reebok-classic-green.jpg',
      price: 6990,
      rating: 4.8,
    },
    {
      name: 'Коврик для фитнеса и йоги 8мм',
      brand: 'Fitness Brand',
      category: 'fitness',
      image: 'fitness-mat.jpg',
      price: 2990,
      rating: 4.6,
    }
  ];

  await this.productModel.insertMany(products);

  return {
    message: 'Products seeded',
    count: products.length,
  };
}
}