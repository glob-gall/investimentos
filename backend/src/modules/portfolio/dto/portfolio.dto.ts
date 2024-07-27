import { IsNotEmpty } from 'class-validator';
import { Portfolio } from '../model/portfolio.entity';

export class PortfolioDto {
  id?: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  slug: string;

  constructor(portfolio?: Portfolio) {
    if (portfolio) {
      this.id = portfolio.id;
      this.title = portfolio.title;
      this.slug = portfolio.slug;
    }
  }
}
