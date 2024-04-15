import { ApiProperty } from '@nestjs/swagger'
import { CATEGORIES } from '../../../constants/categories.enum'
import { ShoppingCart } from '../../shopping-cart/entities/shopping-cart.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  description: string

  @ApiProperty()
  @Column()
  price: number

  @ApiProperty()
  @Column()
  stock: number

  @ApiProperty()
  @Column()
  sold: number

  @ApiProperty()
  @Column({ type: 'text', array: true, default: [] })
  images: string[]

  @ApiProperty({ enum: CATEGORIES })
  @Column({ type: 'enum', enum: CATEGORIES })
  category: CATEGORIES

  @ApiProperty()
  @Column({ default: 1 })
  quantity: number

  @ApiProperty({ type: [ShoppingCart] })
  @ManyToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.products)
  @JoinTable()
  shoppingCart: ShoppingCart[]

  @ApiProperty()
  @CreateDateColumn()
  createAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updateAt: Date
}
