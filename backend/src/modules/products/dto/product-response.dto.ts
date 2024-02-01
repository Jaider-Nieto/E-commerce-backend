import { HttpStatus } from '@nestjs/common'
import { Product } from '../entities/product.entity'
import { Res } from '../../../constants/response.interface'

export class ProductResponseDto extends Res{
  data: Product | Product[]
}
