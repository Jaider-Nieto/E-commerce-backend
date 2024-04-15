import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shoppingCartId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number
}
