import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ShoppingCart } from './entities/shopping-cart.entity'
import { Repository } from 'typeorm'
import { ShoppingCartResponseDto, ShoppingCartsResponseDto } from './dto/shopping-cart-response.dto'
import { Product } from '../products/entities/product.entity'
import { calcTotalPrice } from '../../utils/CalcTotalPrice'
import { User } from '../users/entities/user.entity'

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ShoppingCartsResponseDto> {
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

      if (!shoppingCart || shoppingCart === null)
        throw new HttpException(
          'El carrito de compras ya ha sido eliminado o no existe',
          HttpStatus.BAD_REQUEST,
        )

      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: shoppingCart,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async addProduct(
    id: string,
    productId: number,
  ): Promise<ShoppingCartResponseDto> {
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

      if (!productFound || productFound === null)
        throw new HttpException(
          'producto no existe en el carrito de compras',
          HttpStatus.BAD_REQUEST,
        )
      else {
        if (productFound) {
          productFound.quantity += 1
        } else {
          product.quantity = 1
          shoppingCart.products.push(product)
        }
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

  async removeProduct(
    id: string,
    productId: number,
  ): Promise<ShoppingCartResponseDto> {
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

      if (!productFound || productFound === null)
        throw new HttpException(
          'producto no existe en el carrito de compras',
          HttpStatus.BAD_REQUEST,
        )
      else {
        if (productFound.quantity - 1 > 0) {
          productFound.quantity -= 1
        } else {
          shoppingCart.products = shoppingCart.products.filter(
            (product) => product.id !== productId,
          )
        }
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

  async cleanCart(id: string): Promise<ShoppingCartResponseDto> {
    try {
      const shoppingCart = await this.shoppingCartRepository.findOne({
        where: { id },
        relations: ['products', 'user']
      })

      if (!shoppingCart || shoppingCart === null)
        throw new HttpException(
          'El carrito de compras ya ha sido eliminado o no existe',
          HttpStatus.BAD_REQUEST,
        )

      shoppingCart.products = []
      shoppingCart.totalPrice = 0

      await this.shoppingCartRepository.save(shoppingCart)

      return {
        status: HttpStatus.OK,
        message: 'deleted',
        data: shoppingCart,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
