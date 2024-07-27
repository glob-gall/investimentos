import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './model/portfolio.entity';
import slugify from 'slugify';
import { PurchaseService } from '../purchase/purchase.service';
import { CreatePurchaseDto } from '../purchase/dto/create-purchase.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfoliosRepository: Repository<Portfolio>,
    private purchaseService: PurchaseService,
  ) {}

  async create(dto: CreatePortfolioDto) {
    try {
      let slug = slugify(dto.title, {
        lower: true,
        strict: true,
      });

      let counter = 1;
      let slugCandidate = slug;

      while (
        await this.portfoliosRepository.findOne({
          where: { slug: slugCandidate },
        })
      ) {
        slugCandidate = `${slug}-${counter}`;
        counter++;
      }
      slug = slugCandidate;

      const portfolio = new Portfolio({
        title: dto.title,
        slug,
      });

      const createdPortfolio = await this.portfoliosRepository.save(portfolio);
      return createdPortfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(userId: string) {
    const portfolios = await this.portfoliosRepository.find({
      where: {
        user: { id: userId },
      },
    });
    return portfolios;
  }

  async findById(userId: string, id: string) {
    try {
      const portfolio = await this.portfoliosRepository.findOne({
        where: { id, user: { id: userId } },
        relations: {
          purchases: {
            asset: true,
          },
        },
      });

      if (!portfolio) throw new NotFoundException('portfolio.not_found');

      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findBySlug(userId: string, slug: string) {
    try {
      const portfolio = await this.portfoliosRepository.findOne({
        where: { slug, user: { id: userId } },
        relations: { purchases: { asset: true } },
      });

      if (!portfolio) throw new NotFoundException('portfolio.not_found');

      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteById(userId: string, id: string) {
    try {
      const portfolio = await this.portfoliosRepository.findOne({
        where: { id, user: { id: userId } },
      });
      if (!portfolio) throw new NotFoundException('portfolio.not_found');

      await this.portfoliosRepository.delete(portfolio);

      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addPurchase(userId: string, id: string, dto: CreatePurchaseDto) {
    const portfolio = await this.findById(userId, id);

    const newPurchase = await this.purchaseService.create({
      assetIdentifier: dto.assetIdentifier,
      capital: dto.capital,
      price: dto.price,
    });

    const oldPurchases = portfolio.purchases || [];
    portfolio.purchases = [...oldPurchases, newPurchase];

    try {
      await this.portfoliosRepository.save(portfolio);

      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removePurchase(userId: string, id: string, purchaseId: string) {
    const portfolio = await this.findById(userId, id);
    try {
      const purchase = await this.purchaseService.findById(purchaseId);
      console.log(purchase);

      if (purchase.portfolio.id !== id) {
        throw new UnauthorizedException('purchase.not_yours');
      }
      await this.purchaseService.deleteById(purchaseId);

      portfolio.purchases.filter((p) => p.id !== purchase.id);
      this.portfoliosRepository.save(portfolio);

      return purchase;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
