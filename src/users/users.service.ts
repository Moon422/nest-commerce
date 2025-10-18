import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUserAsync(email: string, password: string) {
    if (!email.length || !password.length) {
      return null
    }

    const user = this.userRepository.create({ email, password })
    return await this.userRepository.save(user)
  }

  async getUserByIdAsync(id: number) {
    if (!id) {
      return null
    }

    const user = await this.userRepository.findOneBy({ id })
    return user
  }

  async getUserByEmailAsync(email: string) {
    if (!email.length) {
      return null
    }

    const user = this.userRepository.findOneBy({ email })
    return user
  }

  async updateUserAsync(user: User) {
    if (!user) {
      return
    }

    await this.userRepository.save(user)
  }
}
