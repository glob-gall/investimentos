import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';

export class RoleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject() private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    console.log(payload);

    // const token = await this.authService.validateUser({ email, password });
    return payload;
  }
}
