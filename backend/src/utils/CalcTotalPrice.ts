import { ShoppingCart } from '../modules/shopping-cart/entities/shopping-cart.entity'

export const calcTotalPrice = (shoppingCart: ShoppingCart) => {
  return shoppingCart.products.reduce(
    (total, shoppingCart) => total + shoppingCart.price * shoppingCart.quantity,
    0,
  )
}
