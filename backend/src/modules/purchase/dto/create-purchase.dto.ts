import { IsNotEmpty } from 'class-validator';
import { PurchaseDto } from './purchase.dto';
import { Omit } from 'src/utils/omit';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto extends Omit(PurchaseDto, ['asset', 'date']) {
  @ApiProperty()
  @IsNotEmpty()
  assetIdentifier: string;
}
