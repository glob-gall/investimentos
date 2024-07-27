import { IsNotEmpty } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  identifier: string;
}