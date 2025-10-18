import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
import moment from 'moment-timezone'
import { CustomerPassword } from 'src/entities/customers/customer-password'
import { Repository } from 'typeorm'

@Injectable()
export class CustomerPasswordService {
  constructor(
    @InjectRepository(CustomerPassword)
    private customerPasswordRepository: Repository<CustomerPassword>,
  ) {}

  private async encryptPassword(password: string) {
    const salt = await genSalt()
    const encrypted = await hash(password, salt)

    return encrypted
  }

  async createPasswordAsync(customerId: number, password: string) {
    const encrypted = await this.encryptPassword(password)
    const createdOnUtc = moment().utc().toDate()
    const customerPassword = this.customerPasswordRepository.create({
      customerId,
      password: encrypted,
      createdOnUtc,
    })

    return await this.customerPasswordRepository.save(customerPassword)
  }

  async verifyPasswordAsync(customerId: number, password: string) {
    const customerPasswords = await this.customerPasswordRepository
      .createQueryBuilder('customerPassword')
      .orderBy('createdOnUtc', 'DESC', 'NULLS LAST')
      .getMany()

    if (!customerPasswords || !customerPasswords.length) {
      return [false, 'Customer do not have passwords.']
    }

    const encrypted = await this.encryptPassword(password)
    if (encrypted === customerPasswords[0].password) {
      return [true, null]
    }

    for (let i = 1; i < customerPasswords.length; i++) {
      const customerPassword = customerPasswords[i]
      if (encrypted === customerPassword.password) {
        return [
          false,
          `Password was changed on ${moment(customerPassword.createdOnUtc).tz('Asia/Dhaka').format('ddd, MMM D, YYYY h:mm A')}.`,
        ]
      }
    }

    return [false, 'Password did not match!']
  }
}
