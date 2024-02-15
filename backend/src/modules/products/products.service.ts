import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'

import { CACHE_KEYS, CATEGORIES } from '../../constants'
import { Product } from './entities/product.entity'
import { CreateProductDto, ProductResponseDto, UpdateProductDto } from './dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
      const cacheProducts: Product[] = await this.cacheManager.get(
        CACHE_KEYS.PRODUCTS_FIND_ALL,
      )

      if (cacheProducts) {
        return {
          status: HttpStatus.OK,
          message:
            cacheProducts.length < 1
              ? 'No hay productos disponibles en este momento'
              : 'ok',
          data: cacheProducts,
        }
      }

      const products = await this.productRepository.find()

      this.cacheManager.set(CACHE_KEYS.PRODUCTS_FIND_ALL, products)

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
      const cacheProduct: Product = await this.cacheManager.get(
        CACHE_KEYS.PRODUCTS_FIND_ONE,
      )

      if (cacheProduct && cacheProduct.id === id) {
        return {
          status: HttpStatus.OK,
          message: 'ok',
          data: cacheProduct,
        }
      }

      const product = await this.productRepository.findOne({ where: { id } })

      if (product === null)
        throw new HttpException(
          `El producto con id ${id} ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      this.cacheManager.set(CACHE_KEYS.PRODUCTS_FIND_ONE, product)

      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: product,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  getCategories() {
    const cacheCategories = this.cacheManager.get(CACHE_KEYS.CATEGORIES)

    if (cacheCategories) {
      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: CATEGORIES,
      }
    }

    this.cacheManager.set(CACHE_KEYS.CATEGORIES, CATEGORIES)

    return {
      status: HttpStatus.OK,
      message: 'ok',
      data: CATEGORIES,
    }
  }

  async findByCategory(category: CATEGORIES): Promise<ProductResponseDto> {
    try {
      const cacheProducts: Product[] = await this.cacheManager.get(
        CACHE_KEYS.PRODUCTS_FIND_BY_CATEGORY,
      )

      if (cacheProducts && cacheProducts[0].category === category) {
        return {
          status: HttpStatus.OK,
          message:
            cacheProducts.length < 1
              ? `no se encontraron productos de categoria ${category}`
              : 'ok',
          data: cacheProducts,
        }
      }

      const products = await this.productRepository.findBy({ category })

      if (products.length > 0) {
        this.cacheManager.set(CACHE_KEYS.PRODUCTS_FIND_BY_CATEGORY, products)
      }

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
      const existProduct = await this.productRepository.exists({
        where: { id },
      })

      if (!existProduct)
        throw new HttpException(
          `El producto con id ${id} no existe o ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      await this.productRepository.update(id, updateProductDto)

      const productUpdated = await this.productRepository.findOne({
        where: { id },
      })

      this.cacheManager.reset()

      return {
        status: HttpStatus.OK,
        message: 'update',
        data: productUpdated,
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

      this.cacheManager.reset()

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
