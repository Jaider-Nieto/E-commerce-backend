import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class Res {
  @ApiProperty({
    enum: [HttpStatus.OK, HttpStatus.CREATED],
    default: HttpStatus.OK,
  })
  status: HttpStatus.OK | HttpStatus.CREATED

  @ApiProperty()
  message: string
}
