import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetDto } from './dto/asset.dto';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async create(@Body() body: CreateAssetDto) {
    const asset = await this.assetService.create(body);

    return new AssetDto(asset);
  }

  @Get()
  async findAll() {
    const assets = await this.assetService.findAll();
    return assets.map((u) => new AssetDto(u));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const asset = await this.assetService.findById(id);
    return new AssetDto(asset);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const asset = await this.assetService.deleteById(id);
    return new AssetDto(asset);
  }
}
