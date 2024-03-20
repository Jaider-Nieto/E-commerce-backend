import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(loginData.email)

      if (!(await compare(loginData.password, user.password))) {
        throw new HttpException('password incorrect', HttpStatus.BAD_REQUEST)
      }

      const payload = { sub: user.id, username: user.name }

      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
