import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('id/:productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(Number(productId));
  }

  @Patch('update/:productId')
  update(@Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(Number(productId), updateProductDto);
  }

  @Delete('delete/:productId')
  remove(@Param('productId') productId: string) {
    return this.productsService.remove(Number(productId));
  }
}
