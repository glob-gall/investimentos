import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return new UserDto(user);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((u) => new UserDto(u));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return new UserDto(user);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const user = await this.userService.deleteById(id);
    return new UserDto(user);
  }
}
