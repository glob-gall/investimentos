import { IsNotEmpty } from 'class-validator';
import { Asset } from '../model/asset.entity';
import { PurchaseDto } from 'src/modules/purchase/dto/purchase.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AssetDto {
  id?: string;
  purchases?: PurchaseDto[];

  @ApiProperty()
  @IsNotEmpty()
  identifier: string;

  constructor(asset?: Asset) {
    if (asset) {
      this.id = asset.id;
      this.identifier = asset.identifier;
      if (asset.purchases) {
        this.purchases = asset.purchases.map((p) => new PurchaseDto(p));
      }
    }
  }
}
