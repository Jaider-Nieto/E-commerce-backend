import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserResponseDto, UsersResponseDto } from './dto/user-response.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('all')
  @ApiResponse({
    type: UsersResponseDto,
  })
  findAll() {
    return this.usersService.findAll()
  }

  @Get('id/:userId')
  @ApiResponse({
    type: UserResponseDto,
  })
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId)
  }

  @Patch('update/:userId')
  @ApiResponse({
    type: UserResponseDto,
  })
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto)
  }

  @Delete('delete/:userId')
  @ApiResponse({
    type: UserResponseDto,
  })
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId)
  }
}
