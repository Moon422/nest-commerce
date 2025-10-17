import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dtos/login-user.dto'
import { UsersService } from './users.service'

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get('colors')
  async getColor(@Session() session: Record<string, any>) {
    return session['color']
  }

  @Get('colors/:color')
  async setColor(
    @Param('color') color: string,
    @Session() session: Record<string, any>,
  ) {
    session['color'] = color
  }

  @Post('signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const { email, password } = createUserDto
    const user = await this.authService.registerAsync(email, password)

    session['user-id'] = user.id
    return { id: user.id, email: user.email }
  }

  @Post('signin')
  async signin(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: Record<string, any>,
  ) {
    const { email, password } = loginUserDto
    const user = await this.authService.verifyAysnc(email, password)
    if (!user) {
      return new BadRequestException()
    }

    session['user-id'] = user.id
    return { id: user.id, email: user.email }
  }

  @Get('whoami')
  async whoAmIAsync(@Session() session: Record<string, any>) {
    const userId = session['user-id'] as number
    const user = await this.userService.getUserByIdAsync(userId)
    if (!user) {
      return new BadRequestException()
    }

    return { id: user.id, email: user.email }
  }
}
