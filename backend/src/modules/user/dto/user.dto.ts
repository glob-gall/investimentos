import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../model/user.entity';
import { PortfolioDto } from 'src/modules/portfolio/dto/portfolio.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id?: string;
  role?: string;
  portfolios?: PortfolioDto[];

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(user?: User) {
    if (user) {
      this.email = user.email;
      this.name = user.name;
      this.id = user.id;
      this.role = user.role;
      this.portfolios = user.portfolios
        ? user.portfolios.map((p) => new PortfolioDto(p))
        : [];
    }
  }
}
