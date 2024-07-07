import { Injectable } from '@nestjs/common';
import { CreateResetPassCodeDto } from './dto/create-reset-pass-code.dto';
import { UpdateResetPassCodeDto } from './dto/update-reset-pass-code.dto';

@Injectable()
export class ResetPassCodeService {
  create(createResetPassCodeDto: CreateResetPassCodeDto) {
    return 'This action adds a new resetPassCode';
  }

  findAll() {
    return `This action returns all resetPassCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resetPassCode`;
  }

  update(id: number, updateResetPassCodeDto: UpdateResetPassCodeDto) {
    return `This action updates a #${id} resetPassCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} resetPassCode`;
  }
}
