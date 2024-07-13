import {
  Controller,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { Req } from 'src/common/types';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateFriendshipRequestDto } from './dto/update-friendship-request.dto';

@Controller('friendship')
@ApiTags('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(AuthGuard)
  @Post() // POST /friendship
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um vínculo de amizade com outro usuário.' })
  create(@Body() addressee_id: string, @Request() req: Req) {
    const createFriendshipDto = {
      addressee_id,
      requester_id: req.user.sub,
    };

    return this.friendshipService.create(createFriendshipDto);
  }

  @UseGuards(AuthGuard)
  @Patch() // PATCH /friendship
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualiza um vínculo de amizade com outro usuário.',
  })
  update(
    @Body() updateFriendshipRequestDto: UpdateFriendshipRequestDto,
    @Request() req: Req,
  ) {
    const updateFriendshipDto: UpdateFriendshipDto = {
      other_user_id: updateFriendshipRequestDto.other_user_id,
      status: updateFriendshipRequestDto.status,
      logged_user_id: req.user.sub,
    };

    return this.friendshipService.update(updateFriendshipDto);
  }
}
