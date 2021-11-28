import
{
  Res,
  Body,
  Post,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';

import { MailerService } from './mailer.service';


@Controller('send')
@UseInterceptors(ClassSerializerInterceptor)
export class MailerController
{
  constructor(private readonly mailService: MailerService) {}

  @Post()
  async SendMail(@RealIP() ip: string, @Body() body: any, @Res() response: Response)
  {
    // if (!body.gRecaptchaResponse) return response.json('Please fill ReCaptcha');
    //
    // const secretKey = process.env.CAPTCHA_SECRET,
    //   verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${body.gRecaptchaResponse}&remoteip=${ip}`;
    //
    // const recaptchaResponse = await fetch(verifyUrl,
    //   {
    //     method: "POST",
    //     headers:
    //       {
    //         Accept: "application/json",
    //         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    //       },
    //   });
    //
    // const data: any = await recaptchaResponse.json();
    // if (!data.success) return response.json('ReCaptcha secret is invalid');

    if (!body.from || !body.to || !body.text || !body.subject) return response.json({ status: 'error', message: 'Please fill all fields' });

    this.mailService.SendMail(body.from, body.to, body.text, body.subject, response).then();
  }
}