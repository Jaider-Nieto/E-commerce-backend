import { ConfigService } from '@nestjs/config'
import { hash } from 'bcrypt'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await hash(
        createUserDto.password,
        Number(this.configService.get('SALT_ROUNDS')),
      )

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
      const users = await this.userRepository.find()
      if (users.length < 1 || users === null) {
        throw new HttpException(
          'No hay usuarios por el momento',
          HttpStatus.NOT_FOUND,
        )
      }
      return users
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const userExist = await this.userRepository.existsBy({ id })

      if (!userExist) {
        throw new HttpException(
          `El usuario con id ${id} no existe`,
          HttpStatus.BAD_REQUEST,
        )
      }

      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['shoppingCart'],
      })

      if (user === null)
        throw new HttpException(
          `El usuario con id ${id} ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const userExist = await this.userRepository.existsBy({ email })
      if (!userExist) {
        throw new HttpException(
          `El usuario asociado al email ${email} no existe`,
          HttpStatus.NOT_FOUND,
        )
      }

      const user = await this.userRepository.findOne({ where: { email } })

      if (!user || user === null) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }

      return user
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
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
