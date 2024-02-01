import { ShoppingCart } from '../entities/shopping-cart.entity'
import { Res } from '../../../constants/response.interface'

export class ShoppingCartResponseDto extends Res {
  data: ShoppingCart | ShoppingCart[]
}


