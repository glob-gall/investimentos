import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly userService: UserService,
    @Inject()
    private readonly jwtService: JwtService,
  ) {}

  login(): string {
    return 'Hello World!';
  }

  logout(): string {
    return 'Hello World!';
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('user.not_found');
    }

    const isValid = await compare(dto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('user.not_found');
    }
    const userDto = new UserDto(user);

    const jwt = this.jwtService.sign({ ...userDto });
    // return jwt;
    return { token: jwt, user: userDto };
  }
}
