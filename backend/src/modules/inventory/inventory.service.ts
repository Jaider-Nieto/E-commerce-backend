import { Injectable } from '@nestjs/common'
import { UpdateInventoryDto } from './dto/update-inventory.dto'
import { Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productsRepository.find({
      select: ['id', 'name', 'price', 'sold', 'stock'],
    })
  }

  async addProduct(productId: number, stock: number) {
    const product = await this.productsRepository.findOneBy({ id: productId })
    product.stock += stock
    return this.productsRepository.save(product)
  }

  async soldProduct(productId: number, stock: number) {
    const product = await this.productsRepository.findOneBy({ id: productId })
    product.stock -= stock
    return this.productsRepository.save(product)
  }
}
