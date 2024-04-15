import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { ShoppingCartService } from './shopping-cart.service'
import { AddProductDto } from './dto/add-product.dto'
import { RemoveProductDto } from './dto/remove-product.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ShoppingCart } from './entities/shopping-cart.entity'

@ApiTags('Shopping-Cart')
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get('all')
  @ApiResponse({
    type: [ShoppingCart],
  })
  findAll() {
    return this.shoppingCartService.findAll()
  }

  @Get('id/:shoppingCartId')
  @ApiResponse({
    type: ShoppingCart,
  })
  findOne(@Param('shoppingCartId') shoppingCartId: string) {
    return this.shoppingCartService.findOne(shoppingCartId)
  }

  @Patch('add')
  @ApiResponse({
    type: ShoppingCart,
  })
  addProduct(@Body() { shoppingCartId, productId }: AddProductDto) {
    return this.shoppingCartService.addProduct(shoppingCartId, productId)
  }

  @Patch('remove')
  @ApiResponse({
    type: ShoppingCart,
  })
  removeProduct(@Body() { shoppingCartId, productId }: RemoveProductDto) {
    return this.shoppingCartService.removeProduct(shoppingCartId, productId)
  }

  @Delete(':shoppingCartId')
  @ApiResponse({
    type: ShoppingCart,
  })
  cleanCart(@Param('shoppingCartId') shoppingCartId: string) {
    return this.shoppingCartService.cleanCart(shoppingCartId)
  }
}
