import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Customer } from 'src/entities/customers/customer'
import { Repository } from 'typeorm'
import PagedList, { toPagedList } from '../paged-list'
import { CustomerFilters } from './customer.filter'
import moment from 'moment'
import { CacheKeyService } from '../caching/cache-key.service'
import {
  cacheKeyAll,
  cacheKeyById,
  cacheKeyByIds,
  NEST_CACHE_TTL,
} from '../caching/entity-cache-defaults'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  cacheKeyCustomerByEmail,
  cacheKeyCustomerByGuid,
  cacheKeyCustomerByUsername,
} from './customer-cache-defaults'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private cacheKeyService: CacheKeyService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getAllCustomerAsync(
    customerFilter: CustomerFilters,
  ): Promise<PagedList<Customer>> {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdOnUtc',
      sortOrder = 'DESC',
      ...filterOptions
    } = customerFilter

    let queryBuilder = this.customerRepository.createQueryBuilder('customer')

    // Text filters
    if (filterOptions.email) {
      queryBuilder = queryBuilder.andWhere('customer.email LIKE :email', {
        email: filterOptions.email,
      })
    }

    if (filterOptions.username) {
      queryBuilder = queryBuilder.andWhere('customer.username LIKE :username', {
        username: `%${filterOptions.username}%`,
      })
    }

    if (filterOptions.firstname) {
      queryBuilder = queryBuilder.andWhere(
        'customer.firstname LIKE :firstname',
        {
          firstname: `%${filterOptions.firstname}%`,
        },
      )
    }

    if (filterOptions.lastname) {
      queryBuilder = queryBuilder.andWhere('customer.lastname LIKE :lastname', {
        lastname: `%${filterOptions.lastname}%`,
      })
    }

    // Location filters
    if (filterOptions.city) {
      queryBuilder = queryBuilder.andWhere('customer.city LIKE :city', {
        city: `%${filterOptions.city}%`,
      })
    }

    if (filterOptions.zipPostalCode) {
      queryBuilder = queryBuilder.andWhere(
        'customer.zipPostalCode LIKE :zipPostalCode',
        {
          zipPostalCode: filterOptions.zipPostalCode,
        },
      )
    }

    if (filterOptions.stateProvinceId) {
      queryBuilder = queryBuilder.andWhere(
        'customer.stateProvinceId = :stateProvinceId',
        {
          stateProvinceId: filterOptions.stateProvinceId,
        },
      )
    }

    if (filterOptions.countryId) {
      queryBuilder = queryBuilder.andWhere('customer.countryId = :countryId', {
        countryId: filterOptions.countryId,
      })
    }

    // Status filters
    if (filterOptions.active !== undefined) {
      queryBuilder = queryBuilder.andWhere('customer.active = :active', {
        active: filterOptions.active,
      })
    }

    if (filterOptions.deleted !== undefined) {
      queryBuilder = queryBuilder.andWhere('customer.deleted = :deleted', {
        deleted: filterOptions.deleted,
      })
    }

    if (filterOptions.isTaxExempted !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'customer.isTaxExempted = :isTaxExempted',
        {
          isTaxExempted: filterOptions.isTaxExempted,
        },
      )
    }

    if (filterOptions.hasShoppingCartItems !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'customer.hasShoppingCartItems = :hasShoppingCartItems',
        {
          hasShoppingCartItems: filterOptions.hasShoppingCartItems,
        },
      )
    }

    if (filterOptions.requireRelogin !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'customer.requireRelogin = :requireRelogin',
        {
          requireRelogin: filterOptions.requireRelogin,
        },
      )
    }

    if (filterOptions.mustChangePassword !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'customer.mustChangePassword = :mustChangePassword',
        {
          mustChangePassword: filterOptions.mustChangePassword,
        },
      )
    }

    // Demographic filters
    if (filterOptions.gender) {
      queryBuilder = queryBuilder.andWhere('customer.gender = :gender', {
        gender: filterOptions.gender,
      })
    }

    if (filterOptions.dateOfBirthFrom) {
      queryBuilder = queryBuilder.andWhere(
        'customer.dateOfBirth >= :dateOfBirthFrom',
        {
          dateOfBirthFrom: filterOptions.dateOfBirthFrom,
        },
      )
    }

    if (filterOptions.dateOfBirthTo) {
      queryBuilder = queryBuilder.andWhere(
        'customer.dateOfBirth <= :dateOfBirthTo',
        {
          dateOfBirthTo: filterOptions.dateOfBirthTo,
        },
      )
    }

    // Account filters
    if (filterOptions.currencyId) {
      queryBuilder = queryBuilder.andWhere(
        'customer.currencyId = :currencyId',
        {
          currencyId: filterOptions.currencyId,
        },
      )
    }

    if (filterOptions.languageId) {
      queryBuilder = queryBuilder.andWhere(
        'customer.languageId = :languageId',
        {
          languageId: filterOptions.languageId,
        },
      )
    }

    if (filterOptions.failedLoginAttemptsMin !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'customer.failedLoginAttempts >= :failedLoginAttemptsMin',
        {
          failedLoginAttemptsMin: filterOptions.failedLoginAttemptsMin,
        },
      )
    }

    if (filterOptions.failedLoginAttemptsMax !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'customer.failedLoginAttempts <= :failedLoginAttemptsMax',
        {
          failedLoginAttemptsMax: filterOptions.failedLoginAttemptsMax,
        },
      )
    }

    // Date range filters
    if (filterOptions.createdOnUtcFrom) {
      queryBuilder = queryBuilder.andWhere(
        'customer.createdOnUtc >= :createdOnUtcFrom',
        {
          createdOnUtcFrom: filterOptions.createdOnUtcFrom,
        },
      )
    }

    if (filterOptions.createdOnUtcTo) {
      queryBuilder = queryBuilder.andWhere(
        'customer.createdOnUtc <= :createdOnUtcTo',
        {
          createdOnUtcTo: filterOptions.createdOnUtcTo,
        },
      )
    }

    if (filterOptions.modifiedOnUtcFrom) {
      queryBuilder = queryBuilder.andWhere(
        'customer.modifiedOnUtc >= :modifiedOnUtcFrom',
        {
          modifiedOnUtcFrom: filterOptions.modifiedOnUtcFrom,
        },
      )
    }

    if (filterOptions.modifiedOnUtcTo) {
      queryBuilder = queryBuilder.andWhere(
        'customer.modifiedOnUtc <= :modifiedOnUtcTo',
        {
          modifiedOnUtcTo: filterOptions.modifiedOnUtcTo,
        },
      )
    }

    if (filterOptions.deletedOnUtcFrom) {
      queryBuilder = queryBuilder.andWhere(
        'customer.deletedOnUtc >= :deletedOnUtcFrom',
        {
          deletedOnUtcFrom: filterOptions.deletedOnUtcFrom,
        },
      )
    }

    if (filterOptions.deletedOnUtcTo) {
      queryBuilder = queryBuilder.andWhere(
        'customer.deletedOnUtc <= :deletedOnUtcTo',
        {
          deletedOnUtcTo: filterOptions.deletedOnUtcTo,
        },
      )
    }

    // Convert query builder to paged list with sorting and pagination
    return await toPagedList(queryBuilder, page, limit)
  }

  async getCustomerByIdAsync(id: number) {
    if (!id) {
      return null
    }

    const cacheKey = this.cacheKeyService.prepareCacheKey(
      cacheKeyById('customer'),
      id.toString(),
    )

    return (
      (await this.cache.get(cacheKey)) ||
      (await this.cache.set(
        cacheKey,
        await this.customerRepository.findOneBy({ id }),
        NEST_CACHE_TTL,
      ))
    )
  }

  async getCustomerByGuidAsync(customerGuid: string) {
    if (!customerGuid) {
      return null
    }

    const cacheKey = this.cacheKeyService.prepareCacheKey(
      cacheKeyCustomerByGuid(),
      customerGuid,
    )

    return (
      (await this.cache.get(cacheKey)) ||
      (await this.cache.set(
        cacheKey,
        await this.customerRepository.findOneBy({ customerGuid }),
        NEST_CACHE_TTL,
      ))
    )
  }

  async getCustomerByEmailAsync(email: string) {
    if (!email) {
      return null
    }

    const cacheKey = this.cacheKeyService.prepareCacheKey(
      cacheKeyCustomerByEmail(),
      email,
    )

    return (
      (await this.cache.get(cacheKey)) ||
      (await this.cache.set(
        cacheKey,
        await this.customerRepository.findOneBy({ email }),
        NEST_CACHE_TTL,
      ))
    )
  }

  async getCustomerByUsernameAsync(username: string) {
    if (!username) {
      return null
    }

    const cacheKey = this.cacheKeyService.prepareCacheKey(
      cacheKeyCustomerByUsername(),
      username,
    )

    return (
      (await this.cache.get(cacheKey)) ||
      (await this.cache.set(
        cacheKey,
        await this.customerRepository.findOneBy({ username }),
        NEST_CACHE_TTL,
      ))
    )
  }

  async createCustomerAsync(customer: Partial<Customer>) {
    customer = this.customerRepository.create(customer)
    customer.createdOnUtc = moment().utc().toDate()

    const cacheKey = cacheKeyAll('customer')
    await this.cache.del(cacheKey)

    return await this.customerRepository.save(customer)
  }

  async updateCustomerAsync(customer: Customer) {
    customer.modifiedOnUtc = moment().utc().toDate()

    const cacheKeys = [
      this.cacheKeyService.prepareCacheKey(cacheKeyAll('customer')),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyById('customer'),
        customer.id.toString(),
      ),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyCustomerByEmail(),
        customer.email,
      ),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyCustomerByGuid(),
        customer.customerGuid,
      ),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyCustomerByUsername(),
        customer.username,
      ),
    ]
    await this.cache.mdel(cacheKeys)

    return await this.customerRepository.save(customer)
  }

  async deleteCustomerAsync(customer: Customer) {
    if (!customer) {
      return null
    }

    const cacheKeys = [
      this.cacheKeyService.prepareCacheKey(cacheKeyAll('customer')),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyById('customer'),
        customer.id.toString(),
      ),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyCustomerByEmail(),
        customer.email,
      ),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyCustomerByGuid(),
        customer.customerGuid,
      ),
      this.cacheKeyService.prepareCacheKey(
        cacheKeyCustomerByUsername(),
        customer.username,
      ),
    ]
    await this.cache.mdel(cacheKeys)

    customer.deleted = true
    customer.deletedOnUtc = moment().utc().toDate()
    return await this.customerRepository.save(customer)
  }
}
