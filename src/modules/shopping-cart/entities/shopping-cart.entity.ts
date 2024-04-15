import { ApiProperty } from '@nestjs/swagger'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class ShoppingCart {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({ default: 0 })
  totalPrice: number

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.shoppingCart)
  @JoinColumn()
  user: User

  @ApiProperty({ type: [Product] })
  @ManyToMany(() => Product, (products) => products.shoppingCart, {
    cascade: true,
  })
  @JoinTable()
  products: Product[]
}
