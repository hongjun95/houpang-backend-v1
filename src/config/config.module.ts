import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import JwtConfig from './jwt.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '.env.development' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',

      load: [
        () => ({ app: AppConfig() }),
        () => ({ database: DatabaseConfig() }),
        () => ({ jwt: JwtConfig() }),
      ],
    }),
  ],
})
export class ConfigModule {}
