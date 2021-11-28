import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

require('dotenv').config({ path: `./src/mailer/mailer.config.env` });


const bootstrap = async () =>
{
    let logger = new Logger('Bootstrap'),
        app = await NestFactory.create(AppModule);


    app.useGlobalPipes(
        new ValidationPipe(
            {
                whitelist: true,
            }),
    );

    (app as any).set('etag', false);

    app.use((req, res, next) =>
    {
        res.removeHeader('x-powered-by');
        res.removeHeader('date');
        next();
    });

    await app.listen(3435);

    logger.log(`Application listening on port 3435`);
}


bootstrap().then(() => console.log('bootstrap function !'));