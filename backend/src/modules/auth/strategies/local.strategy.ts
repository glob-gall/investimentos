import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../auth.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject() private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    console.log(email, password);

    const token = await this.authService.validateUser({ email, password });
    return token;
  }
}
