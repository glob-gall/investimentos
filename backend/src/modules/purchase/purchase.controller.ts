import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { LoggedUser } from 'src/decorators/user.decorator';
import { User } from '../user/model/user.entity';
import { UserRole } from '../user/enum/user-role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchases')
@Controller('purchases')
@UseGuards(JwtAuthGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(@Body() body: CreatePurchaseDto) {
    const purchase = await this.purchaseService.create(body);

    return new PurchaseDto(purchase);
  }

  @Get()
  async findAll(@LoggedUser() loggedUser: User) {
    if (loggedUser.role === UserRole.Admin) {
      const purchases = await this.purchaseService.findAll();
      return purchases.map((u) => new PurchaseDto(u));
    }
  }

  @Get('/:id')
  async findById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    if (loggedUser.role === UserRole.Admin) {
      const purchase = await this.purchaseService.findById(id);
      return new PurchaseDto(purchase);
    }
  }

  @Delete('/:id')
  async deleteById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    if (loggedUser.role === UserRole.Admin) {
      const purchase = await this.purchaseService.deleteById(id);
      return new PurchaseDto(purchase);
    }
  }
}
