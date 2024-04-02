import { Controller, Get, Body, Patch, Param } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { FindByCategoryDto } from './dto/find-by-categry.dto'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('all')
  findAll() {
    return this.inventoryService.findAll()
  }

  //byCategory
  @Get('category/:category')
  findByCategory(@Param() category: FindByCategoryDto) {
    return this.inventoryService.findByCategory(category.category)
  }

  //topSellers
  @Get('top-sellers')
  getTopSellers() {
    return this.inventoryService.getTopSellers()
  }

  //lessSold
  @Get('less-sold')
  getLessSold() {
    return this.inventoryService.getLessSold()
  }

  @Patch('add/:productId')
  addProduct(
    @Param('productId') productId: string,
    @Body('stock') stock: number,
  ) {
    return this.inventoryService.addProduct(Number(productId), stock)
  }

  @Patch('sold/:productId')
  soldProduct(
    @Param('productId') productId: string,
    @Body('stock') stock: number,
  ) {
    return this.inventoryService.soldProduct(Number(productId), stock)
  }
}
