import { IsNotEmpty } from 'class-validator';
import { Asset } from '../model/asset.entity';

export class AssetDto {
  id?: string;

  @IsNotEmpty()
  identifier: string;

  constructor(asset?: Asset) {
    if (asset) {
      this.id = asset.id;
      this.identifier = asset.identifier;
    }
  }
}
