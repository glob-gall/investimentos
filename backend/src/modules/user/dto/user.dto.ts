import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../model/user.entity';
import { PortfolioDto } from 'src/modules/portfolio/dto/portfolio.dto';

export class UserDto {
  id?: string;
  role?: string;
  portfolios?: PortfolioDto[];

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(user?: User) {
    if (user) {
      this.email = user.email;
      this.name = user.name;
      this.id = user.id;
      this.role = user.role;
      if (user.portfolios) {
        this.portfolios = user.portfolios.map((p) => new PortfolioDto(p));
      }
    }
  }
}
