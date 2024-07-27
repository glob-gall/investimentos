import { IsNotEmpty } from 'class-validator';
import { PortfolioDto } from './portfolio.dto';
import { Omit } from 'src/utils/omit';
export class CreatePortfolioDto extends Omit(PortfolioDto, ['user']) {
  @IsNotEmpty()
  title: string;

  // user: string;
}
