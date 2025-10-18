import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid4 } from 'uuid'

@Entity()
export class Customer {
  constructor() {
    this.customerGuid = uuid4()
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 36 })
  customerGuid: string

  @Column({ length: 72 })
  username: string

  @Column({ length: 250 })
  email: string

  @Column({ length: 128 })
  firstname: string

  @Column({ length: 72 })
  lastname: string

  @Column({ length: 6 })
  gender: 'male' | 'female'

  @Column()
  dateOfBirth: Date | null

  @Column({ length: 512 })
  streetAddress: string

  @Column({ length: 256 })
  streetAddress2: string

  @Column({ length: 32 })
  zipPostalCode: string

  @Column({ length: 256 })
  city: string

  @Column()
  stateProvinceId: number

  @Column()
  countryId: number

  @Column({ length: 14 })
  phonenumber: string

  @Column()
  currencyId: number | null

  @Column()
  languageId: number | null

  @Column({ length: 1024 })
  adminComment: string

  @Column()
  isTaxExempted: boolean

  @Column()
  hasShoppingCartItems: boolean

  @Column()
  requireRelogin: boolean

  @Column()
  failedLoginAttempts: number

  @Column()
  cannotLoginUntilDateUtc: Date | null

  @Column()
  active: boolean

  @Column()
  mustChangePassword: boolean

  @Column()
  createdOnUtc: Date

  @Column()
  modifiedOnUtc: Date | null

  @Column()
  deleted: boolean

  @Column()
  deletedOnUtc: Date | null
}
