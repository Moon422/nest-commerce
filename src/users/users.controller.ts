import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dtos/login-user.dto'

@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto
    await this.authService.registerAsync(email, password)
  }

  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto
    const user = await this.authService.verifyAysnc(email, password)
    if (!user) {
      return new BadRequestException()
    }

    return { id: user.id, email: user.email }
  }
}
