import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const host = GqlExecutionContext.create(ctx).getContext();
    // let user: User;

    // if (host) {
    //   if (host.getType() === 'graphql') {
    //     const gqlContext = host.getContext();
    //     user = gqlContext.user;
    //   } else if (host.getType() === 'http') {
    //     const req = host.getArgByIndex(0);
    //     console.log(req.user);
    //     // if (req.headers.hasOwnProperty('authorization')) {
    //     //   const authorization = req.headers['authorization'];
    //     //   if (authorization.includes('Bearer')) {
    //     //     user = authorization.split(' ')[1];
    //     //     console.log(user);
    //     //   }
    //     // }
    //   }
    // }
    // const user = gqlContext.user;
    return host.user;
  },
);
