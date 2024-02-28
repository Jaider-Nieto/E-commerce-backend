import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUserDto)
      user.shoppingCart = await this.shoppingCartRepository.save({})

      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async AddShoppingCart(user: User, shoppingCart: ShoppingCart) {
    user.shoppingCart = shoppingCart

    await this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['shoppingCart'],
      })

      if (!user || user === null)
        throw new HttpException(
          `El usuario con id ${id} no existe o ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })

      if (!user || user === null)
        throw new HttpException(
          `El usuario con id ${id} no existe o ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      await this.userRepository.update(id, updateUserDto)

      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })

      if (!user || user === null)
        throw new HttpException(
          `El usuario con id ${id} no existe o ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      await this.shoppingCartRepository.delete({
        user: { id: user.id },
      })

      await this.userRepository.remove(user)
      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
