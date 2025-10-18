import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dtos/login-user.dto'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from './user.entity'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() currentUser: User | null) {
    return currentUser ? { message: 'logged in' } : { message: 'not logged in' }
  }

  @Post('signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const { email, password } = createUserDto
    const user = await this.authService.registerAsync(email, password)
    if (!user) {
      return new BadRequestException()
    }

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

  @Get('signout')
  async signout(@Session() session: Record<string, any>) {
    session['user-id'] = null
  }
}
