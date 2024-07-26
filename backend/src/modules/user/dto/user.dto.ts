import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../model/user.entity';

export class UserDto {
  id?: string;
  role?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;

    this.id = user.id;
    this.role = user.role;
  }
}
