import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common'
import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { CustomerPasswordService } from 'src/services/customers/customer-password.service'
import { CustomerService } from 'src/services/customers/customer.service'
import { v4 as uuid4 } from 'uuid'
import moment from 'moment-timezone'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Customer } from 'src/entities/customers/customer'

@ApiTags('Products')
@Controller('auth')
export class AuthController {
  constructor(
    private customerService: CustomerService,
    private customerPasswordService: CustomerPasswordService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to account' })
  @ApiResponse({
    status: 200,
    description: 'Logged in to account successfully',
  })
  async login(@Body() loginDto: LoginDto) {
    const customer = await this.customerService.getCustomerByEmailAsync(
      loginDto.email,
    )
    if (!customer) {
      return new BadRequestException({ message: 'Wrong credentials.' })
    }

    const [passwordVerfied, verficationMessage] =
      await this.customerPasswordService.verifyPasswordAsync(
        customer.id,
        loginDto.password,
      )

    if (!passwordVerfied) {
      return new BadRequestException({ message: verficationMessage })
    }

    return { customerId: customer.id, email: customer.email }
  }

  @Get('logout')
  @ApiOperation({ summary: 'Log out from account' })
  @ApiResponse({
    status: 200,
    description: 'Logged out from account successfully',
  })
  logout() {
    return {}
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new account' })
  @ApiResponse({
    status: 201,
    description: 'Registered new account successfully',
  })
  async register(@Body() registerDto: RegisterDto) {
    if (
      (await this.customerService.getCustomerByEmailAsync(registerDto.email)) ||
      (await this.customerService.getCustomerByUsernameAsync(
        registerDto.username,
      ))
    ) {
      return new BadRequestException({
        message: 'Account same email or username is found.',
      })
    }

    const {
      username,
      email,
      phonenumber,
      firstname,
      lastname,
      gender,
      dateOfBirth,
      streetAddress,
      streetAddress2,
      zipPostalCode,
      city,
      stateProvinceId,
      countryId,
      currencyId,
      languageId,
      password,
    } = registerDto

    console.log(registerDto)

    const customer = await this.customerService.createCustomerAsync({
      customerGuid: uuid4(),
      username,
      email,
      phonenumber,
      firstname,
      lastname,
      gender,
      dateOfBirth: dateOfBirth ? moment(dateOfBirth).utc().toDate() : null,
      streetAddress,
      streetAddress2,
      zipPostalCode,
      city,
      stateProvinceId,
      countryId,
      currencyId,
      languageId,
    })

    await this.customerPasswordService.createPasswordAsync(
      customer.id,
      password,
    )

    return { id: customer.id, email: customer.email }
  }
}
