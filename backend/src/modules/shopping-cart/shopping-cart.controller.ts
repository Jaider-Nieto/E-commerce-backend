import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ShoppingCartService } from './shopping-cart.service'
import { AddProductDto } from './dto/add-product.dto'
import { RemoveProductDto } from './dto/remove-product.dto'

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get('all')
  findAll() {
    return this.shoppingCartService.findAll()
  }

  @Get('id/:shoppingCartId')
  findOne(@Param('shoppingCartId') shoppingCartId: string) {
    return this.shoppingCartService.findOne(shoppingCartId)
  }

  @Patch('add')
  addProduct(@Body() { shoppingCartId, productId }: AddProductDto) {
    return this.shoppingCartService.addProduct(shoppingCartId, productId)
  }

  @Patch('remove')
  removeProduct(@Body() { shoppingCartId, productId }: RemoveProductDto) {
    return this.shoppingCartService.removeProduct(shoppingCartId, productId)
  }

  @Delete(':shoppingCartId')
  cleanCart(@Param('shoppingCartId') shoppingCartId: string) {
    return this.shoppingCartService.cleanCart(shoppingCartId)
  }
}
