import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as compression from "compression"
// import * as rateLimit from "express-rate-limit"
// import * as helmet from "helmet"
// import * as nocache from "nocache"
import * as cookieParser from 'cookie-parser';

import { ConfigService } from '@nestjs/config';
import { AppModule } from '@src/app.module';

export async function bootstrap() {
  /*
  |--------------------------------------------------------------------------
  | Creates an instance of the NestApplication
  |--------------------------------------------------------------------------
  |
  | Nest application context. Nest context is a wrapper around the Nest
  | container, which holds all instantiated classes. We can grab an existing
  | instance from within any imported module directly using application object.
  | Hence, you can take advantage of the Nest framework everywhere, including
  | CRON jobs and even build a CLI on top of it.
  |
  */

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  /*
    |--------------------------------------------------------------------------
    | Add Global Express Middlewares
    |--------------------------------------------------------------------------
    |
    | Here we can add some globel express middlewares. This will affect the
    | whole application.
    |
    */

  const corsOptions = {
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  };
  // app.enableCors(corsOptions);
  app.enableCors();
  //   app.use(helmet())
  //   app.use(nocache())
  //   app.use(compression())
  //   app.use(
  //     (rateLimit as any)({
  //       windowMs: 15 * 60 * 1000, // 15 minutes
  //       max: 100, // limit each IP to 100 requests per windowMs
  //     }),
  //   )
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  //   app.useStaticAssets(resolve(__dirname, "..", "resources"))

  /*
    |--------------------------------------------------------------------------
    | Swagger
    |--------------------------------------------------------------------------
    |
    | Swagger is a Open-Source framework to design and document your api.
    | The added tags define our RESTful resource endpoints.
    |
    */

  const options = new DocumentBuilder()
    .setTitle(config.get('app.name'))
    .setDescription(config.get('app.description'))
    .setVersion(config.get('app.version'))
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  /*
    |--------------------------------------------------------------------------
    | Run The Application
    |--------------------------------------------------------------------------
    |
    | Once we have our application, we can listen for incoming request and send
    | the associated response.
    |
    */

  const logger = new Logger('bootstrap');

  await app.listen(config.get('app.port'), () => {
    logger.log(
      `Server is listen on http://localhost:${config.get('app.port')}`,
    );
  });

  // await app.listen(4000);
}
