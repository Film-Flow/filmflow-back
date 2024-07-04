import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Req } from 'src/auth/auth.service';

@Controller('user') // /user
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // POST /user
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile') // /user/profile
  getProfile(@Request() req: Req) {
    return this.userService.findById(req.user.sub);
  }
}
