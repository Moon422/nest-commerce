import { Customer } from 'src/entities/customers/customer'

export interface CustomerFilters {
  // Text search filters
  email?: string
  username?: string
  firstname?: string
  lastname?: string

  // Location filters
  city?: string
  zipPostalCode?: string
  stateProvinceId?: number
  countryId?: number

  // Status filters
  active?: boolean
  deleted?: boolean
  isTaxExempted?: boolean
  hasShoppingCartItems?: boolean
  requireRelogin?: boolean
  mustChangePassword?: boolean

  // Demographic filters
  gender?: 'male' | 'female'
  dateOfBirthFrom?: Date
  dateOfBirthTo?: Date

  // Account filters
  currencyId?: number
  languageId?: number
  failedLoginAttemptsMin?: number
  failedLoginAttemptsMax?: number

  // Date filters
  createdOnUtcFrom?: Date
  createdOnUtcTo?: Date
  modifiedOnUtcFrom?: Date
  modifiedOnUtcTo?: Date
  deletedOnUtcFrom?: Date
  deletedOnUtcTo?: Date

  // Pagination
  page?: number
  limit?: number

  // Sorting
  sortBy?: keyof Customer
  sortOrder?: 'ASC' | 'DESC'
}
