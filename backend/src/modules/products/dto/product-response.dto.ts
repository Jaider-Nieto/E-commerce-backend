import { HttpStatus } from '@nestjs/common'
import { Product } from '../entities/product.entity'

export class ProductResponseDto {
  status: HttpStatus

  message: string

  data: Product | Product[]
}
