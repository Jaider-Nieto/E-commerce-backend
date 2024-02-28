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
import { User } from './entities/user.entity'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiCreatedResponse({
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('all')
  @ApiResponse({
    type: [User],
  })
  findAll() {
    return this.usersService.findAll()
  }

  @Get('id/:userId')
  @ApiResponse({
    type: User,
  })
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId)
  }

  @Patch('update/:userId')
  @ApiResponse({
    type: User,
  })
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto)
  }

  @Delete('delete/:userId')
  @ApiResponse({
    type: User,
  })
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId)
  }
}
