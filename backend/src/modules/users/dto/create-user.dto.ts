import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  birthDate: Date

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adress: string
}
