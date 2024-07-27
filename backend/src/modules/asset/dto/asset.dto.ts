import { IsNotEmpty } from 'class-validator';
import { Asset } from '../model/asset.entity';
import { PurchaseDto } from 'src/modules/purchase/dto/purchase.dto';

export class AssetDto {
  id?: string;
  purchases?: PurchaseDto[];

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
