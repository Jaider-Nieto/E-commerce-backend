import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { CreateInventoryDto } from './dto/create-inventory.dto'
import { UpdateInventoryDto } from './dto/update-inventory.dto'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('all')
  findAll() {
    return this.inventoryService.findAll()
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
