import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { hash } from 'bcrypt';
import { UserRole } from './enum/user-role.enum';
import { CreatePortfolioDto } from '../portfolio/dto/create-portfolio.dto';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private portfolioService: PortfolioService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const saltOrRounds = 8;
      const hashedPassord = await hash(dto.password, saltOrRounds);

      const userWithSameEmail = await this.findByEmail(dto.email);
      if (userWithSameEmail) {
        throw new BadRequestException('user.email_already_exist');
      }

      const user = new User({
        email: dto.email,
        name: dto.name,
        password: hashedPassord,
        role: UserRole.User,
      });
      const createdUser = await this.usersRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findById(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id,
        },
        relations: {
          portfolios: {
            purchases: {
              asset: true,
            },
          },
        },
      });

      if (!user) throw new NotFoundException('user.not_found');

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteById(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('user.not_found');

      await this.usersRepository.delete(user);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addPortFolio(id: string, dto: CreatePortfolioDto) {
    const user = await this.findById(id);

    try {
      const portfolio = await this.portfolioService.create(dto);

      const oldPortfolios = user.portfolios || [];
      user.portfolios = [...oldPortfolios, portfolio];
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removePortFolio(userId: string, portfolioId: string) {
    const portfolio = await this.portfolioService.findById(userId, portfolioId);

    try {
      await this.portfolioService.deleteById(userId, portfolioId);
      return portfolio;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
