import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { TOKEN_KEY } from '@apis/common/common.constants';
import { JwtService } from '@jwt/jwt.service';
import { UsersService } from '@apis/users/users.service';
import { AllowedRoles } from '@auth/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AllowedRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    let token: string = null;
    const host = GqlExecutionContext.create(context);

    if (host) {
      if (host.getType() === 'graphql') {
        const gqlContext = host.getContext();
        token = gqlContext.token;
      } else if (host.getType() === 'http') {
        const req = host.getArgByIndex(0);
        if (req.headers.hasOwnProperty(TOKEN_KEY)) {
          const authorization = req.headers[TOKEN_KEY];
          if (authorization.includes('Bearer')) {
            token = authorization.split(' ')[1];
          }
        }
      }
    }

    if (token) {
      const decoded = this.jwtService.verify(token);
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { ok, user } = await this.usersService.findUserById(
          decoded['id'],
        );
        if (ok) {
          const gqlContext = host.getContext();
          gqlContext['user'] = user;

          if (roles.includes('Any')) {
            return true;
          }
          return roles.includes(user.role);
        }
      }
    }

    if (roles.includes('Any')) {
      return true;
    }

    return false;
  }
}
