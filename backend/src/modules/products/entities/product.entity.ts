import { CATEGORIES } from 'src/constants/categories.enum'
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
