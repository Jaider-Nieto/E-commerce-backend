import { ShoppingCart } from '../entities/shopping-cart.entity'
import { Res } from '../../../interfaces/response.interface'
import { ApiProperty } from '@nestjs/swagger'

export class ShoppingCartResponseDto extends Res {
  @ApiProperty({ type: ShoppingCart })
  data: ShoppingCart
}

export class ShoppingCartsResponseDto extends Res {
  @ApiProperty({ type: [ShoppingCart] })
  data: ShoppingCart[]
}
