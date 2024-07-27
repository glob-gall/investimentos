import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfolioDto } from './dto/portfolio.dto';
import { CreatePurchaseDto } from '../purchase/dto/create-purchase.dto';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(@Body() body: CreatePortfolioDto) {
    const portfolio = await this.portfolioService.create(body);
    console.log(portfolio);

    return new PortfolioDto(portfolio);
  }

  @Get()
  async findAll() {
    const portfolios = await this.portfolioService.findAll();
    return portfolios.map((u) => new PortfolioDto(u));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const portfolio = await this.portfolioService.findById(id);
    return new PortfolioDto(portfolio);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const portfolio = await this.portfolioService.deleteById(id);
    return new PortfolioDto(portfolio);
  }

  @Put(':id/add-purchase')
  async addPurchase(
    @Param('id') id: string,
    @Body() body: { purchase: CreatePurchaseDto },
  ) {
    const portfolio = await this.portfolioService.addPurchase(
      id,
      body.purchase,
    );

    return new PortfolioDto(portfolio);
  }

  @Delete(':id/purchase/:purchaseId')
  async removePurchase(
    @Param('id') id: string,
    @Param('purchaseId') purchaseId: string,
  ) {
    const portfolio = await this.portfolioService.removePurchase(
      id,
      purchaseId,
    );

    return new PortfolioDto(portfolio);
  }
}
