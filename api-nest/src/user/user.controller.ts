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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Req } from 'src/common/types';

@Controller('user') // /user
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // POST /user
  async create(@Body() createUserDto: CreateUserDto) {
    const { password_hash, ...user } =
      await this.userService.create(createUserDto);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile') // /user/profile
  async getProfile(@Request() req: Req) {
    const { password_hash, ...user } = await this.userService.findById(
      req.user.sub,
    );
    return user;
  }
}
