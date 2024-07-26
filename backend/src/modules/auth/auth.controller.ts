import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  jwt(@Req() req: Request) {
    console.log(req.user);
    return 'ok';
  }

  @Get('role')
  @UseGuards(JwtAuthGuard)
  role(@Req() req: Request) {
    console.log(req.user);
    return 'ok';
  }
}
