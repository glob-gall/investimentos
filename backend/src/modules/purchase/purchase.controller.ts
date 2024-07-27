import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(@Body() body: CreatePurchaseDto) {
    const purchase = await this.purchaseService.create(body);

    return new PurchaseDto(purchase);
  }

  @Get()
  async findAll() {
    const purchases = await this.purchaseService.findAll();
    return purchases.map((u) => new PurchaseDto(u));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const purchase = await this.purchaseService.findById(id);
    return new PurchaseDto(purchase);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const purchase = await this.purchaseService.deleteById(id);
    return new PurchaseDto(purchase);
  }
}
