import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CATEGORIES } from '../../constants'

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productsRepository.find({
      select: ['id', 'name', 'price', 'sold', 'stock', 'category'],
    })
  }

  async findByCategory(category: CATEGORIES) {
    const products = await this.productsRepository.find({
      where: { category },
      select: ['id', 'name', 'category', 'price', 'sold', 'stock'],
    })

    if (!products || products.length < 1) {
      throw new HttpException('No hay productos', HttpStatus.BAD_REQUEST)
    }

    console.log(products)

    return products
  }

  async getTopSellers() {
    const products = await this.productsRepository.find({
      order: { sold: -1 },
    })

    if (!products || products.length < 1) {
      throw new HttpException('No hay productos', HttpStatus.BAD_REQUEST)
    }

    return products
  }

  async getLessSold() {
    const products = await this.productsRepository.find({
      order: { sold: 1 },
    })

    if (!products || products.length < 1) {
      throw new HttpException('No hay productos', HttpStatus.BAD_REQUEST)
    }

    return products
  }

  async addProduct(productId: number, stock: number) {
    const product = await this.productsRepository.findOneBy({ id: productId })
    product.stock += stock
    return this.productsRepository.save(product)
  }

  async soldProduct(productId: number, stock: number) {
    const product = await this.productsRepository.findOneBy({ id: productId })
    product.stock -= stock
    product.sold += stock
    return this.productsRepository.save(product)
  }
}
