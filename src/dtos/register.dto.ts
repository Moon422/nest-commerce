import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username chosen by the user',
    maxLength: 72,
    minLength: 3,
  })
  @IsString()
  @MaxLength(72)
  @MinLength(3)
  username: string

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address of the user',
    maxLength: 250,
    minLength: 5,
  })
  @IsEmail()
  @MinLength(5)
  @MaxLength(250)
  email: string

  @ApiProperty({
    example: 'securePass123',
    description:
      'Strong password (min 6 characters, but no specific complexity enforced)',
    minLength: 6,
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  firstname: string

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    maxLength: 72,
  })
  @IsString()
  @MaxLength(72)
  @IsNotEmpty()
  lastname: string

  @ApiProperty({
    example: 'male',
    description: "Gender of the user ('male' or 'female')",
    enum: ['male', 'female'],
  })
  @IsString()
  gender: 'male' | 'female'

  @ApiProperty({
    example: '1990-05-15',
    description: 'Date of birth in ISO format (YYYY-MM-DD)',
    type: String,
    nullable: true,
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth: string | null

  @ApiProperty({
    example: '123 Main Street',
    description: 'Primary street address',
    maxLength: 512,
  })
  @IsString()
  @MaxLength(512)
  @IsNotEmpty()
  streetAddress: string

  @ApiProperty({
    example: 'Apartment 4B',
    description: 'Optional secondary street address (e.g., apartment, suite)',
    maxLength: 256,
    nullable: true,
  })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  streetAddress2: string | null

  @ApiProperty({
    example: 'Dhaka',
    description: 'City name',
    maxLength: 256,
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  city: string

  @ApiProperty({
    example: '1205',
    description: 'ZIP or postal code',
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  zipPostalCode: string

  @ApiProperty({
    example: 1,
    description: 'ID of the state or province',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  stateProvinceId: number

  @ApiProperty({
    example: 1,
    description: 'ID of the country',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  countryId: number

  @ApiProperty({
    example: '+8801712345678',
    description: 'Phone number in international format',
    nullable: true,
  })
  @IsPhoneNumber()
  @IsOptional()
  phonenumber: string | null

  @ApiProperty({
    example: 1,
    description: 'Preferred currency ID (nullable)',
    nullable: true,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  currencyId: number | null

  @ApiProperty({
    example: 2,
    description: 'Preferred language ID (nullable)',
    nullable: true,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  languageId: number | null
}
