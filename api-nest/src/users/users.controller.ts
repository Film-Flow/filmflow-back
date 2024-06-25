// import {
//   Body,
//   Controller,
//   Post
// } from '@nestjs/common'
import { Body, Controller, Post } from '@nestjs/common'
import {
    ApiExtraModels,
    ApiResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiExtraModels(User)
    @ApiResponse({
        status: 200,
        schema: {
            $ref: getSchemaPath(User),
        },
    })
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }
}
