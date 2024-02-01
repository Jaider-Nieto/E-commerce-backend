import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  shoppingCartId: string

  @IsNotEmpty()
  @IsNumber()
  productId: number
}
