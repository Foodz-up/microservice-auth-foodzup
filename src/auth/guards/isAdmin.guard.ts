import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/user/dto/user.dto';
import Role from 'src/user/entities/user.role';
import { UserService } from 'src/user/user.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) return false;

    return request.user && request.user.role === Role.Administrateur;
  }
}
