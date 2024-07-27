import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Asset } from './model/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  async create(dto: CreateAssetDto) {
    try {
      const findedAsset = await this.assetsRepository.findOne({
        where: { identifier: dto.identifier },
      });
      if (findedAsset) return findedAsset;

      const asset = new Asset({
        identifier: dto.identifier,
      });

      const createdAsset = await this.assetsRepository.save(asset);
      return createdAsset;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const assets = await this.assetsRepository.find();
    return assets;
  }

  async findById(id: string) {
    try {
      const asset = await this.assetsRepository.findOne({
        where: { id },
      });

      if (!asset) throw new NotFoundException('asset.not_found');

      return asset;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findByIdentifier(identifier: string) {
    console.log(identifier);

    try {
      const asset = await this.assetsRepository.findOne({
        where: { identifier },
      });

      if (!asset) throw new NotFoundException('asset.not_found');

      return asset;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOrCreate(identifier: string) {
    try {
      let asset = await this.assetsRepository.findOne({
        where: { identifier },
      });

      if (!asset) {
        asset = new Asset({
          identifier: identifier,
        });
        asset = await this.assetsRepository.save(asset);
      }

      return asset;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteById(id: string) {
    try {
      const asset = await this.assetsRepository.findOne({
        where: { id },
      });
      if (!asset) throw new NotFoundException('asset.not_found');

      await this.assetsRepository.delete(asset);

      return asset;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
