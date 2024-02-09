import { Product } from '../entities/product.entity'
import { Res } from '../../../constants/response.interface'
import { ApiProperty } from '@nestjs/swagger'
import { CATEGORIES } from 'src/constants/categories.enum'

export class ProductResponseDto extends Res {
  @ApiProperty({ type: Product || [Product] })
  data: Product | Product[]
}

export class ProductsResponseDto extends Res {
  @ApiProperty({ type: [Product] })
  data: Product[]
}

export class ProductsResponseCategoriesDto extends Res {
  @ApiProperty({ enum: [CATEGORIES] })
  data: CATEGORIES[]
}
