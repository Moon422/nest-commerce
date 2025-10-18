export function cacheKeyCustomerByGuid(): string {
  return `nest.customer.byguid.{0}`
}

export function cacheKeyCustomerByEmail(): string {
  return `nest.customer.byemail.{0}`
}

export function cacheKeyCustomerByUsername(): string {
  return `nest.customer.byusername.{0}`
}
