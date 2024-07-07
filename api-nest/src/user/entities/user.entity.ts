import { IsNotEmpty, IsString } from 'class-validator';
import { UserWithoutPassword } from './user-without-password.entity';

export class User extends UserWithoutPassword {
  @IsString()
  @IsNotEmpty()
  password_hash: string;
}
