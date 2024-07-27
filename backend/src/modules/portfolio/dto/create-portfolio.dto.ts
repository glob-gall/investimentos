import { IsNotEmpty } from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty()
  title: string;
}
