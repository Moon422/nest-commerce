export class Customer {
  customerGuid: string

  username: string

  email: string

  firstname: string

  lastname: string

  gender: 'male' | 'female'

  dateOfBirth: Date | null

  streetAddress: string

  streetAddress2: string

  zipPostalCode: string

  city: string

  stateProvinceId: number

  countryId: number

  phonenumber: string

  currencyId: number | null

  languageId: number | null

  adminComment: string

  isTaxExempted: boolean

  hasShoppingCartItems: boolean

  requireRelogin: boolean

  failedLoginAttempts: number

  cannotLoginUntilDateUtc: Date | null

  active: boolean

  mustChangePassword: boolean

  createdOnUtc: Date

  modifiedOnUtc: Date | null

  deleted: boolean

  deletedOnUtc: Date | null
}
