import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'Hello World!';
  }

  logout(): string {
    return 'Hello World!';
  }

  validateToken(): string {
    return 'Hello World!';
  }
}
