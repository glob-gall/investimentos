import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

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
