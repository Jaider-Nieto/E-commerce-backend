import { Product } from 'src/modules/products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

export class CreateShoppingCartDto {
  product: number
  user: User
}
