import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../../constants/permission';
import { PERMISSIONS_KEY } from '../../decorators/permissions.decorator';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.includes(Permission.ANY)) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.hasPermissions(Permission.ADMIN)) {
      return true;
    }

    if (!user.hasPermissions(...requiredPermissions)) {
      throw new ForbiddenException(null, 'У вас недостатньо прав');
    }

    return true;
  }
}
