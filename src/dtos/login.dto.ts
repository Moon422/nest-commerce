import { IsEmail, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password of the user',
  })
  @IsString()
  password: string
}
