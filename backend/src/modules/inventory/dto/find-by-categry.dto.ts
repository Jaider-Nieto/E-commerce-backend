import { IsEnum } from 'class-validator'
import { CATEGORIES } from '../../../constants'

export class FindByCategoryDto {
  @IsEnum(CATEGORIES)
  category: CATEGORIES
}
