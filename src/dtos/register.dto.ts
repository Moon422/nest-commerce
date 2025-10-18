import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class RegisterDto {
  @IsString()
  @MaxLength(72)
  @MinLength(3)
  username: string

  @IsEmail()
  @MinLength(5)
  @MaxLength(250)
  email: string

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string

  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  firstname: string

  @IsString()
  @MaxLength(72)
  @IsNotEmpty()
  lastname: string

  gender: 'male' | 'female'

  @IsDateString()
  dateOfBirth: string | null

  @IsString()
  @MaxLength(512)
  @IsNotEmpty()
  streetAddress: string

  @IsString()
  @MaxLength(256)
  streetAddress2: string | null

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  city: string

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  zipPostalCode: string

  @IsNumber()
  @Min(1)
  stateProvinceId: number

  @IsNumber()
  @Min(1)
  countryId: number

  @IsPhoneNumber()
  phonenumber: string | null

  @IsNumber()
  @Min(1)
  currencyId: number | null

  @IsNumber()
  @Min(1)
  languageId: number | null
}
