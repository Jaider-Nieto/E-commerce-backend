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
import { ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll()
  }

  @ApiParam({
    name: 'userId',
  })
  @Get('id/:userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId)
  }

  @Patch('update/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto)
  }

  @Delete('delete/:userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId)
  }
}
