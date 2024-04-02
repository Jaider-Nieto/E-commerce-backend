import { IsEnum } from 'class-validator'
import { CATEGORIES } from 'src/constants'

export class FindByCategoryDto {
  @IsEnum(CATEGORIES)
  category: CATEGORIES
}
