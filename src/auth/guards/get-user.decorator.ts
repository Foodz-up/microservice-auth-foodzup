import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

//TODO: Permettre de récuperer l'id de l'utilisateur depuis le cookie -> jwt
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
