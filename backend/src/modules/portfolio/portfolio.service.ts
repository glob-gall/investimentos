import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './model/portfolio.entity';
import slugify from 'slugify';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfoliosRepository: Repository<Portfolio>,
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

  async findAll() {
    const portfolios = await this.portfoliosRepository.find();
    return portfolios;
  }

  async findById(id: string) {
    try {
      const portfolio = await this.portfoliosRepository.findOne({
        where: { id },
      });

      if (!portfolio) throw new NotFoundException('portfolio.not_found');

      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteById(id: string) {
    try {
      const portfolio = await this.portfoliosRepository.findOne({
        where: { id },
      });
      if (!portfolio) throw new NotFoundException('portfolio.not_found');

      await this.portfoliosRepository.delete(portfolio);

      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
