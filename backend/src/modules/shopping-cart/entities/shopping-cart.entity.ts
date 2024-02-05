import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import {
  BeforeInsert,
  BeforeUpdate,
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
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 0 })
  totalPrice: number

  @OneToOne(() => User, (user) => user.shoppingCart)
  @JoinColumn()
  user: User

  @ManyToMany(() => Product, (products) => products.shoppingCart, {
    cascade: true,
  })
  @JoinTable()
  products: Product[]
}
