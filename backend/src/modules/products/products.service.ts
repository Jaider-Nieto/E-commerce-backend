import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductResponseDto } from './dto/product-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository, ILike } from 'typeorm'
import { CATEGORIES } from 'src/constants/categories.enum'

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
        message:
          products.length < 1
            ? 'No hay productos disponibles en este momento'
            : 'ok',
        data: products,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findByMatch(filter: string) {
    const products = await this.productRepository.find({
      where: [
        { name: ILike(`%${filter}%`) },
        { description: ILike(`%${filter}%`) },
      ],
    })

    return {
      status: HttpStatus.OK,
      message:
        products.length < 1
          ? `No se encontraron productos disponibles que incluyan la palabra ${filter}`
          : 'ok',
      data: products,
    }
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findOne({ where: { id } })

      if (product === null)
        throw new HttpException(
          `El producto con id ${id} ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: product,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getCategories() {
    return {
      status: HttpStatus.OK,
      message: 'ok',
      data: CATEGORIES,
    }
  }

  async findByCategory(category: CATEGORIES): Promise<ProductResponseDto> {
    try {
      const products = await this.productRepository.findBy({ category })

      return {
        status: HttpStatus.OK,
        message:
          products.length < 1
            ? `no se encontraron productos de categoria ${category}`
            : 'ok',
        data: products,
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
      const product = await this.productRepository.findOne({ where: { id } })

      if (product === null || !product)
        throw new HttpException(
          `El producto con id ${id} no existe o ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      await this.productRepository.update(id, updateProductDto)
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

      if (product === null || !product)
        throw new HttpException(
          `El producto con id ${id} no existe o ya ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

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
