import { Module } from '@nestjs/common';
import { MailerModule } from './mailer/mailer.module';


@Module(
  {
    imports:
      [
        MailerModule,
      ],
  })

export class AppModule {}