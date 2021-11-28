import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';


@Module(
  {
    imports:
      [
        ConfigModule.forRoot(),
      ],
    controllers: [MailerController],
    providers: [MailerService]
  })

export class MailerModule {}