import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CATEGORIES } from '../../constants/categories.enum'
import { Product } from './entities/product.entity'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @ApiCreatedResponse({
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @ApiResponse({
    type: [Product],
  })
  @Get('all')
  findAll() {
    return this.productsService.findAll()
  }

  @ApiResponse({
    type: [Product],
  })
  @Get('search/:filter')
  findByMatch(@Param('filter') filter: string) {
    return this.productsService.findByMatch(filter)
  }

  @ApiCreatedResponse({
    type: Product,
  })
  @Get('id/:productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(Number(productId))
  }

  @Get('category')
  @ApiResponse({})
  categories() {
    return this.productsService.getCategories()
  }

  @Get('category/:category')
  @ApiCreatedResponse({
    type: [Product],
  })
  findByCategory(@Param('category') category: CATEGORIES) {
    return this.productsService.findByCategory(category)
  }

  @Patch('update/:productId')
  @ApiResponse({
    type: Product,
  })
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(Number(productId), updateProductDto)
  }

  @Delete('delete/:productId')
  @ApiResponse({
    type: Product,
  })
  remove(@Param('productId') productId: string) {
    return this.productsService.remove(Number(productId))
  }
}
