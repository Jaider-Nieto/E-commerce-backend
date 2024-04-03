import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateShoppingCartDto {
  @ApiProperty()
  @IsNumber()
  productId: number

  @IsString()
  @ApiProperty()
  userId: string
}
