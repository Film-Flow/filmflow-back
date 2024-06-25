import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nickname: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}
