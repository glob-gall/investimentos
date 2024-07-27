import { IsNotEmpty } from 'class-validator';
import { Purchase } from '../model/purchase.entity';

export class PurchaseDto {
  id?: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  capital: number;

  @IsNotEmpty()
  date: Date;

  constructor(purchase?: Purchase) {
    if (purchase) {
      this.id = purchase.id;
      this.capital = purchase.capital;
      this.price = purchase.price;
      this.date = purchase.date;
    }
  }
}
