import { IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
