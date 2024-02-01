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
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  stock: number

  @Column()
  sold: number

  @Column({ type: 'text', array: true, default: [] })
  images: string[]

  @Column({ type: 'enum', enum: CATEGORIES })
  category: CATEGORIES

  @Column({ default: 1 })
  quantity: number

  @ManyToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.products)
  @JoinTable()
  shoppingCart: ShoppingCart[]

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
