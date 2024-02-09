import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CATEGORIES } from 'src/constants/categories.enum'
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ProductResponseDto,
  ProductsResponseCategoriesDto,
  ProductsResponseDto,
} from './dto/product-response.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @ApiCreatedResponse({
    type: ProductResponseDto,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @ApiResponse({
    type: ProductsResponseDto,
  })
  @Get('all')
  findAll() {
    return this.productsService.findAll()
  }

  @ApiResponse({
    type: ProductsResponseDto,
  })
  @Get('search/:filter')
  findByMatch(@Param('filter') filter: string) {
    return this.productsService.findByMatch(filter)
  }

  @ApiCreatedResponse({
    type: ProductResponseDto,
  })
  @Get('id/:productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(Number(productId))
  }

  @Get('category')
  @ApiResponse({
    type: ProductsResponseCategoriesDto,
  })
  categories() {
    return this.productsService.getCategories()
  }

  @Get('category/:category')
  @ApiCreatedResponse({
    type: ProductsResponseDto,
  })
  findByCategory(@Param('category') category: CATEGORIES) {
    return this.productsService.findByCategory(category)
  }

  @Patch('update/:productId')
  @ApiResponse({
    type: ProductResponseDto,
  })
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(Number(productId), updateProductDto)
  }

  @Delete('delete/:productId')
  @ApiResponse({
    type: ProductResponseDto,
  })
  remove(@Param('productId') productId: string) {
    return this.productsService.remove(Number(productId))
  }
}
