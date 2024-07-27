import { IsNotEmpty, IsNumber } from 'class-validator';
import { Purchase } from '../model/purchase.entity';
import { AssetDto } from 'src/modules/asset/dto/asset.dto';

export class PurchaseDto {
  id?: string;
  date: Date;
  asset: AssetDto;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  capital: number;

  constructor(purchase?: Purchase) {
    if (purchase) {
      this.id = purchase.id;
      this.capital = purchase.capital;
      this.price = purchase.price;
      this.date = purchase.date;
      this.asset = new AssetDto(purchase.asset);
    }
  }
}
