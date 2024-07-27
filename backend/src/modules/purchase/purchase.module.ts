import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './model/purchase.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase]), AssetModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
