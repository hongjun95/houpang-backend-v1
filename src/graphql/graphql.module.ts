import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';

import { TOKEN_KEY } from '@apis/common/common.constants';

@Module({
  imports: [
    NestGraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,

      context: ({ req }) => {
        let token: string = '';
        let authorization: string = '';
        if (req.headers.hasOwnProperty(TOKEN_KEY)) {
          authorization = req.headers[TOKEN_KEY];
        }

        if (authorization.includes('Bearer')) {
          token = authorization.split(' ')[1];
        }

        return {
          token,
        };
      },
    }),
  ],
})
export class GraphQLModule {}
