import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
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
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  /*
  |--------------------------------------------------------------------------
  | Swagger
  |--------------------------------------------------------------------------
  |
  | Swagger is a Open-Source framework to design and document your api.
  | The added tags define our RESTful resource endpoints.
  |
  */

  // const options = new DocumentBuilder()
  //   .setTitle(config.get('app.title'))
  //   .setDescription(config.get('app.description'))
  //   .setVersion(config.get('app.version'))
  //   .addTag('API Information', 'Basic information about this API')
  //   .addTag('Tournament', 'Main resource of this API')
  //   .addTag('team')
  //   .addTag('Game')
  //   .addTag('generator')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('docs', app, document);

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
bootstrap();
