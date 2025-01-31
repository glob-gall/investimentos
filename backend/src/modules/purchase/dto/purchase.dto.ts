import { IsNotEmpty, IsNumber } from 'class-validator';
import { Purchase } from '../model/purchase.entity';
import { AssetDto } from 'src/modules/asset/dto/asset.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseDto {
  id?: string;
  date: Date;
  asset: AssetDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
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
