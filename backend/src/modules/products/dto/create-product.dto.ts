import { IsArray, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @IsNumber()
  stock: number

  @IsNumber()
  sold: number

  @IsArray()
  @IsString({ each: true })
  images: string[]
}
