import { HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  status: HttpStatus;
  message: string;
  data: User | User[];
}
