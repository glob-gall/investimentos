import { IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  password: string;
}
