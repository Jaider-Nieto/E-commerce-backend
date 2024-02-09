import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { UserResponseDto, UsersResponseDto } from './dto/user-response.dto'
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.save(createUserDto)
      user.shoppingCart = await this.shoppingCartRepository.save({})

      return {
        status: HttpStatus.OK,
        message: 'user created',
        data: user,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async AddShoppingCart(user: User, shoppingCart: ShoppingCart) {
    user.shoppingCart = shoppingCart

    await this.userRepository.save(user)
  }

  async findAll(): Promise<UsersResponseDto> {
    try {
      const users = await this.userRepository.find()
      return {
        status: HttpStatus.OK,
        message: users.length < 1 ? 'No hay usuarios disponibles' : 'ok',
        data: users,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<UserResponseDto> {
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

      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: user,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })

      if (!user || user === null)
        throw new HttpException(
          `El usuario con id ${id} no existe o ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )

      await this.userRepository.update(id, updateUserDto)

      return {
        status: HttpStatus.OK,
        message: 'update',
        data: user,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<UserResponseDto> {
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
      return {
        status: HttpStatus.OK,
        message: 'delete',
        data: user,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
