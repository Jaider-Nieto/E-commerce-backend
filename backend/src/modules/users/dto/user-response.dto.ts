import { User } from '../entities/user.entity'
import { Res } from '../../../interfaces/response.interface'
import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto extends Res {
  @ApiProperty({ type: User })
  data: User
}

export class UsersResponseDto extends Res {
  @ApiProperty({ type: [User] })
  data: User[]
}
