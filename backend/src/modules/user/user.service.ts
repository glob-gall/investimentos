import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { hash } from 'bcrypt';
import { UserRole } from './enum/user-role.enum';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateUserDto) {
    const saltOrRounds = 8;
    const hashedPassord = await hash(dto.password, saltOrRounds);

    const user = new User({
      email: dto.email,
      name: dto.name,
      password: hashedPassord,
      role: UserRole.User,
    });
    const createdUser = await this.usersRepository.save(user);

    return createdUser;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    const dtos = users.map((u) => new UserDto(u));
    return dtos;
  }

  async findById(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!user) throw new NotFoundException('user.not_found');

      return new UserDto(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteById(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('user.not_found');

      await this.usersRepository.delete(user);

      return new UserDto(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
