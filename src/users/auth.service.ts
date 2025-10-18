import { Injectable } from '@nestjs/common'
import { UsersService } from './users.service'
import { hash, genSalt, compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async verifyAysnc(email: string, password: string) {
    if (!email.length || !password.length) {
      return null
    }

    const user = await this.usersService.getUserByEmailAsync(email)
    if (!user) {
      return null
    }

    if (!(await compare(password, user.password))) {
      return null
    }

    return user
  }

  async resetPassword(userId: number, password: string) {
    if (!userId || !password.length) {
      return
    }

    const user = await this.usersService.getUserByIdAsync(userId)
    if (!user) {
      return
    }

    const salt = await genSalt()
    const hashedPassword = await hash(password, salt)

    user.password = hashedPassword
    await this.usersService.updateUserAsync(user)
  }

  async registerAsync(email: string, password: string) {
    if (!email.length || !password.length) {
      return null
    }

    const salt = await genSalt()
    const hashedPassword = await hash(password, salt)

    return await this.usersService.createUserAsync(email, hashedPassword)
  }
}
