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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { CreatePortfolioDto } from '../portfolio/dto/create-portfolio.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { LoggedUser } from 'src/decorators/user.decorator';
import { User } from './model/user.entity';
import { UserRole } from './enum/user-role.enum';
import { PortfolioDto } from '../portfolio/dto/portfolio.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return new UserDto(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((u) => new UserDto(u));
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    if (loggedUser.role === UserRole.Admin || loggedUser.id === id) {
      const user = await this.userService.findById(id);
      return new UserDto(user);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@LoggedUser() loggedUser: User, @Param('id') id: string) {
    if (loggedUser.role === UserRole.Admin) {
      const user = await this.userService.deleteById(id);
      return new UserDto(user);
    }
  }

  @Put('/add-portfolio')
  @UseGuards(JwtAuthGuard)
  async addPortFolio(
    @LoggedUser() loggedUser: User,
    @Body() body: CreatePortfolioDto,
  ) {
    const user = await this.userService.addPortFolio(loggedUser.id, body);
    return new UserDto(user);
  }

  @Delete('/remove-portfolio/:portfolioId')
  @UseGuards(JwtAuthGuard)
  async removePortFolio(
    @LoggedUser() loggedUser: User,
    @Param('portfolioId') portfolioId: string,
  ) {
    const deletedPortfolio = await this.userService.removePortFolio(
      loggedUser.id,
      portfolioId,
    );
    return new PortfolioDto(deletedPortfolio);
  }
}
