import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator'
import { CATEGORIES } from 'src/constants/categories.enum'

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsNumber()
  stock: number

  @ApiProperty()
  @IsNumber()
  sold: number

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  images: string[]

  @ApiProperty({ enum: CATEGORIES })
  @IsEnum(CATEGORIES)
  category: CATEGORIES
}
