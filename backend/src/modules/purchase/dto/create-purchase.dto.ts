import { IsNotEmpty } from 'class-validator';
import { PurchaseDto } from './purchase.dto';
import { Omit } from 'src/utils/omit';

export class CreatePurchaseDto extends Omit(PurchaseDto, ['asset', 'date']) {
  @IsNotEmpty()
  assetIdentifier: string;
}
