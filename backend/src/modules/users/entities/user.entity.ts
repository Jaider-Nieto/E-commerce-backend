import { ShoppingCart } from '../../shopping-cart/entities/shopping-cart.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  birthDate: Date

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  country: string

  @Column()
  adress: string

  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
  @JoinColumn()
  shoppingCart: ShoppingCart

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
