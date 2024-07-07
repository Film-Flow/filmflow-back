import { IsDate, IsNotEmpty } from 'class-validator';
import { UserWithoutPassword } from '../entities/user-without-password.entity';

export class CreateUserResponseDto {
  user: UserWithoutPassword;

  @IsDate()
  @IsNotEmpty()
  expires_in: Date;
}
