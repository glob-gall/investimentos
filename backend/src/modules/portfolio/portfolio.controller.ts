import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfolioDto } from './dto/portfolio.dto';
import { CreatePurchaseDto } from '../purchase/dto/create-purchase.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { LoggedUser } from 'src/decorators/user.decorator';
import { User } from '../user/model/user.entity';
import { UserRole } from '../user/enum/user-role.enum';
import { PurchaseDto } from '../purchase/dto/purchase.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Portfolios')
@Controller('portfolios')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(
    @LoggedUser() loggedUser: User,
    @Body() body: CreatePortfolioDto,
  ) {
    if (loggedUser.role === UserRole.Admin) {
      const portfolio = await this.portfolioService.create(body);
      console.log(portfolio);

      return new PortfolioDto(portfolio);
    }
  }

  @Get()
  async findAll(@LoggedUser() loggedUser: User) {
    const portfolios = await this.portfolioService.findAll(loggedUser.id);
    return portfolios.map((u) => new PortfolioDto(u));
  }

  @Get('/:slug')
  async findBySlug(
    @LoggedUser() loggedUser: User,
    @Param('slug') slug: string,
  ) {
    const portfolio = await this.portfolioService.findBySlug(
      loggedUser.id,
      slug,
    );
    return new PortfolioDto(portfolio);
  }

  @Delete('/:id')
  async deleteById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    const portfolio = await this.portfolioService.deleteById(loggedUser.id, id);
    return new PortfolioDto(portfolio);
  }

  @Put('/:id/add-purchase')
  async addPurchase(
    @LoggedUser() loggedUser: User,
    @Param('id') id: string,
    @Body() body: CreatePurchaseDto,
  ) {
    const portfolio = await this.portfolioService.addPurchase(
      loggedUser.id,
      id,
      body,
    );
    return new PortfolioDto(portfolio);
  }

  @Delete('/:id/remove-purchase/:purchaseId')
  async removePurchase(
    @LoggedUser() loggedUser: User,
    @Param('id') id: string,
    @Param('purchaseId') purchaseId: string,
  ) {
    const deletedPurchase = await this.portfolioService.removePurchase(
      loggedUser.id,
      id,
      purchaseId,
    );

    return new PurchaseDto(deletedPurchase);
  }
}
