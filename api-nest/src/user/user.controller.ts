import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Req } from 'src/common/types';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { UserPublicProfile } from './entities/user-public-profile.entity';
import { FindUserQueryDto } from './dto/find-user-query.dto';
import { MessagesHelper } from 'src/helpers/messages.helper';
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
    const { password_hash, ...user } = await this.userService.findProfile(
      req.user.sub,
    );
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(':user_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista um usuário específico pelo id.' })
  @ApiParam({ name: 'user_id', required: true, description: 'ID do usuário' })
  async findByIdWithConnection(
    @Request() req: Req,
    @Param('user_id') user_id: string,
  ): Promise<UserPublicProfile> {
    console.log('user_id', user_id);
    return await this.userService.findByIdWithConnection({
      logged_user_id: req.user.sub,
      other_user_id: user_id,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista os usuários.' })
  async findUser(
    @Request() req: Req,
    @Query() findUserQueryDto: FindUserQueryDto,
  ) {
    if (
      findUserQueryDto.init === undefined ||
      !findUserQueryDto.limit === undefined
    ) {
      throw new BadRequestException(
        MessagesHelper.NO_INIT_OR_LIMIT_PARAM_FOUND,
      );
    }

    if (!findUserQueryDto.date && !findUserQueryDto.name) {
      throw new BadRequestException(MessagesHelper.NO_QUERY_PARAMS);
    }

    return this.userService.findMany(findUserQueryDto, req.user.sub);
  }
  
  
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
