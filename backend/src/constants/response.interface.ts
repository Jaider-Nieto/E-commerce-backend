import { HttpStatus } from '@nestjs/common'

export class Res {
  status: HttpStatus
  message: string
}
