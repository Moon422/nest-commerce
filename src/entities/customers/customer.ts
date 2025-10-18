import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Customer {
  // constructor() {
  //   this.customerGuid = uuid4()
  // }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 36 })
  customerGuid: string

  @Column({ length: 72, unique: true })
  username: string

  @Column({ length: 250, unique: true })
  email: string

  @Column({ length: 128 })
  firstname: string

  @Column({ length: 72 })
  lastname: string

  @Column({ length: 6 })
  gender: 'male' | 'female'

  @Column({ type: 'datetime', nullable: true })
  dateOfBirth: Date | null

  @Column({ length: 512 })
  streetAddress: string

  @Column({ type: 'varchar', length: 256, nullable: true })
  streetAddress2: string | null

  @Column({ length: 32 })
  zipPostalCode: string

  @Column({ length: 256 })
  city: string

  @Column({ type: 'int' })
  stateProvinceId: number

  @Column({ type: 'int' })
  countryId: number

  @Column({ type: 'varchar', length: 256, nullable: true })
  phonenumber: string | null

  @Column({ type: 'int', nullable: true })
  currencyId: number | null

  @Column({ type: 'int', nullable: true })
  languageId: number | null

  @Column({ type: 'varchar', length: 1024, nullable: true })
  adminComment: string | null
  @Column()
  isTaxExempted: boolean

  @Column()
  hasShoppingCartItems: boolean

  @Column()
  requireRelogin: boolean

  @Column({ type: 'int' })
  failedLoginAttempts: number

  @Column({ type: 'datetime', nullable: true })
  cannotLoginUntilDateUtc: Date | null

  @Column()
  active: boolean

  @Column()
  mustChangePassword: boolean

  @Column({ type: 'datetime' })
  createdOnUtc: Date

  @Column({ type: 'datetime', nullable: true })
  modifiedOnUtc: Date | null

  @Column()
  deleted: boolean

  @Column({ type: 'datetime', nullable: true })
  deletedOnUtc: Date | null
}
