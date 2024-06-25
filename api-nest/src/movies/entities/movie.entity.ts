import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class Movie {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    release_year: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    popularity: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rating: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    runtime: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image_url: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    created_at: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    updated_at: Date
}
