// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/model/user.entity';

export const LoggedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User; // Cast the user object to your User entity type
  },
);
