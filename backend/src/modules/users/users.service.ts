import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { UserResponseDto } from './dto/user-response.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.save(createUserDto)
      return {
        status: HttpStatus.OK,
        message: 'user created',
        data: user,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<UserResponseDto> {
    try {
      const users = await this.userRepository.find()
      return {
        status: HttpStatus.OK,
        message: 'ok',
        data: users,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
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
      await this.userRepository.update(id, updateUserDto)

      const user = await this.userRepository.findOne({ where: { id } })
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
