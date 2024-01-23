import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductResponseDto } from './dto/product-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.save(createProductDto)
      return {
        status: HttpStatus.OK,
        message: 'create',
        data: product,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<ProductResponseDto> {
    try {
      const products = await this.productRepository.find()

      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: products,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findOne({ where: { id } })
      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: product,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      await this.productRepository.update(id, updateProductDto)
      const product = await this.productRepository.findOne({ where: { id } })
      return {
        status: HttpStatus.OK,
        message: 'update',
        data: product,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findOne({ where: { id } })
      await this.productRepository.remove(product)
      return {
        status: HttpStatus.OK,
        message: 'delete',
        data: product,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
