import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  @UseGuards(LocalGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req: Request, @Body() body: AuthDto) {
    return req.user;
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  jwt(@Req() req: Request) {
    console.log(req.user);
    return 'ok';
  }
}
