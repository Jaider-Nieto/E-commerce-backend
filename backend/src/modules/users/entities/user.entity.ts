import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  birthDate: Date

  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column()
  country: string

  @ApiProperty()
  @Column()
  adress: string

  @ApiProperty({ type: () => ShoppingCart })
  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  shoppingCart: ShoppingCart

  @ApiProperty()
  @CreateDateColumn()
  createAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updateAt: Date
}
