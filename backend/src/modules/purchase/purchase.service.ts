import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './model/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private assetService: AssetService,
  ) {}

  async create(dto: CreatePurchaseDto) {
    const asset = await this.assetService.findOrCreate(dto.assetIdentifier);

    try {
      const purchase = new Purchase({
        capital: dto.capital,
        price: dto.price,
        asset,
        date: new Date(),
      });

      const createdPurchase = await this.purchasesRepository.save(purchase);
      return createdPurchase;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const purchases = await this.purchasesRepository.find();
    return purchases;
  }

  async findById(id: string) {
    try {
      const purchase = await this.purchasesRepository.findOne({
        where: { id },
        relations: { portfolio: true },
      });

      if (!purchase) throw new NotFoundException('purchase.not_found');

      return purchase;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteById(id: string) {
    try {
      const purchase = await this.purchasesRepository.findOne({
        where: { id },
      });

      if (!purchase) throw new NotFoundException('purchase.not_found');
      await this.purchasesRepository.delete(purchase);

      return purchase;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
