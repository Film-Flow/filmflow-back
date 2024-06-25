import { Movie } from '@/movies/entities/movie.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator'

export class User {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nickname: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password_hash: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    created_at: Date

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    updated_at: Date

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    is_verified: boolean

    @IsArray()
    @ApiProperty()
    watch_list: Movie[]
}
