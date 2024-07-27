import { IsNotEmpty } from 'class-validator';
import { Portfolio } from '../model/portfolio.entity';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { PurchaseDto } from 'src/modules/purchase/dto/purchase.dto';

export class PortfolioDto {
  id?: string;
  user?: UserDto;
  slug: string;

  purchases: PurchaseDto[];

  @IsNotEmpty()
  title: string;

  constructor(portfolio?: Portfolio) {
    if (portfolio) {
      this.id = portfolio.id;
      this.title = portfolio.title;
      this.slug = portfolio.slug;
      if (portfolio.user) {
        this.user = new UserDto(portfolio.user);
      }
      if (portfolio.purchases) {
        this.purchases = portfolio.purchases.map((p) => new PurchaseDto(p));
      }
    }
  }
}
