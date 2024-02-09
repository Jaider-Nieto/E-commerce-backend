import { User } from '../entities/user.entity'
import { Res } from '../../../constants/response.interface'

export class UserResponseDto extends Res {
  data: User
}

export class UsersResponseDto extends Res {
  data: User[]
}
