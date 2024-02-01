import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ShoppingCart } from './entities/shopping-cart.entity'
import { Repository } from 'typeorm'
import { ShoppingCartResponseDto } from './dto/shopping-cart-response.dto'
import { Product } from '../products/entities/product.entity'
import { calcTotalPrice } from '../../utils/CalcTotalPrice'

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCartResponseDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: createShoppingCartDto.product },
      })

      const shoppingCart = await this.shoppingCartRepository.save({
        products: [product],
        user: createShoppingCartDto.user,
        totalPrice: product.price,
      })
      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: shoppingCart,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<ShoppingCartResponseDto> {
    try {
      const shoppingCarts = await this.shoppingCartRepository.find({
        relations: ['products', 'user'],
      })
      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: shoppingCarts,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<ShoppingCartResponseDto> {
    try {
      const shoppingCart = await this.shoppingCartRepository.findOne({
        where: { id },
        relations: ['products', 'user'],
      })
      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: shoppingCart,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async add(id: string, productId: number): Promise<ShoppingCartResponseDto> {
    try {
      if (!id)
        throw new HttpException('missing id field', HttpStatus.BAD_REQUEST)
      if (!productId)
        throw new HttpException(
          'missing productId field',
          HttpStatus.BAD_REQUEST,
        )

      const shoppingCart = await this.shoppingCartRepository.findOne({
        where: { id },
        relations: ['products'],
      })

      if (!shoppingCart || shoppingCart === null)
        throw new HttpException(
          'shoppingCart is not defined',
          HttpStatus.BAD_REQUEST,
        )

      const product = await this.productRepository.findOne({
        where: { id: productId },
      })

      if (!product || product === null)
        throw new HttpException(
          'product is not defined',
          HttpStatus.BAD_REQUEST,
        )

      const productFound = shoppingCart.products.find(
        (product) => product.id === productId,
      )

      if (productFound) {
        productFound.quantity += 1
      } else {
        product.quantity = 1
        shoppingCart.products.push(product)
      }

      shoppingCart.totalPrice = calcTotalPrice(shoppingCart)

      await this.shoppingCartRepository.save(shoppingCart)

      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: shoppingCart,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string) {
    try {
      const shoppingCart = await this.shoppingCartRepository.findOne({
        where: { id },
      })

      await this.shoppingCartRepository.remove(shoppingCart)

      return 'eliminao'
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}