import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userData: CreateUserDto) {}

  @Post('login')
  login(@Body() userData: LoginDto) {
    return this.authService.login(userData)
  }
}
