import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ShoppingCartService } from './shopping-cart.service'
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto'
import { AddProductDto } from './dto/add-product.dto'

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post('create')
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto)
  }

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
  removeProduct(@Body() { shoppingCartId, productId }: AddProductDto) {
    return this.shoppingCartService.removeProduct(shoppingCartId, productId)
  }

  @Delete(':shoppingCartId')
  remove(@Param('shoppingCartId') shoppingCartId: string) {
    return this.shoppingCartService.remove(shoppingCartId)
  }
}
