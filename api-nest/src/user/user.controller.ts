import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Req } from 'src/common/types';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithoutPassword } from './entities/user-without-password.entity';
import { UserService } from './user.service';

@Controller('user') // /user
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // POST /user
  @ApiOperation({ summary: 'Cria um usuário utilizando o provedor local' })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const { user, expires_in } = await this.userService.create(createUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithOutPassword } = user;

    return {
      user: userWithOutPassword,
      expires_in,
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile') // /user/profile
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista as informações do usuário logado.' })
  async getProfile(@Request() req: Req): Promise<UserWithoutPassword> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...user } = await this.userService.findById(
      req.user.sub,
    );
    return user;
  }

  @UseGuards(AuthGuard)
  @Delete('profile') // /user/profile
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta o usuário logado.' })
  async deleteProfile(@Request() req: Req): Promise<{message: string, deletedAt: Date}> {
    await this.userService.delete(req.user.sub);
    return { 
      message: 'Usuário deletado com sucesso.',
      deletedAt: new Date()
    }
  }

  // @UseGuards(AuthGuard)
  // @Put('profile') // /user/profile
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Deleta o usuário logado.' })
  // async updateProfile(@Request() req: Req): Promise<UserWithoutPassword> {
  //   await this.userService.updateProfile(req.user.sub);
  //   return user;
  // }
}
