import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CustomerPassword {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  customerId: number

  @Column({ type: 'char', length: 60 })
  password: string

  @Column()
  createdOnUtc: Date
}
