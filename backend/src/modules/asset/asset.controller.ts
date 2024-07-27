import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetDto } from './dto/asset.dto';
import { User } from '../user/model/user.entity';
import { LoggedUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserRole } from '../user/enum/user-role.enum';

@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async create(@LoggedUser() loggedUser: User, @Body() body: CreateAssetDto) {
    if (loggedUser.role === UserRole.Admin) {
      const asset = await this.assetService.create(body);
      return new AssetDto(asset);
    }
  }

  @Get()
  async findAll(@LoggedUser() loggedUser: User) {
    if (loggedUser.role === UserRole.Admin) {
      const assets = await this.assetService.findAll();
      return assets.map((u) => new AssetDto(u));
    }
  }

  @Get(':id')
  async findById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    if (loggedUser.role === UserRole.Admin) {
      const asset = await this.assetService.findById(id);
      return new AssetDto(asset);
    }
  }

  @Delete(':id')
  async deleteById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    if (loggedUser.role === UserRole.Admin) {
      const asset = await this.assetService.deleteById(id);
      return new AssetDto(asset);
    }
  }
}
