import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
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
}
