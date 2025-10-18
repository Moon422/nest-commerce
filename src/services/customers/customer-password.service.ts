import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomerPassword } from 'src/entities/customers/customer-password'
import { Repository } from 'typeorm'

@Injectable()
export class CustomerPasswordService {
  constructor(
    @InjectRepository(CustomerPassword)
    private customerPasswordRepository: Repository<CustomerPassword>,
  ) {}
}
