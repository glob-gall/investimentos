import { IsNotEmpty } from 'class-validator';
import { PortfolioDto } from './portfolio.dto';
import { Omit } from 'src/utils/omit';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePortfolioDto extends Omit(PortfolioDto, ['user']) {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  // user: string;
}
