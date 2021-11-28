import { createTransport } from 'nodemailer';


export class MailerService
{
  private static NewTransport(mailOptions)
  {
    return createTransport(
      {
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        auth:
          {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
      }).sendMail(mailOptions);
  }

  private static async Send(from: string, to: string, text: string, subject: string): Promise<void>
  {
    const mailOptions =
      {
        from,
        to,
        subject,
        text,
      };
    await MailerService.NewTransport(mailOptions);
  }

  async SendMail(from: string, to: string, text: string, subject: string, response): Promise<void>
  {
    try
    {
      await MailerService.Send(from, to, text, subject)
    }
    catch (e)
    {
      return response.json({ status: 'error', message: e })
    }

    return response.json({ status: 'success', message: `Your message successfully send`, data: { from, to, text, subject } })
  }
}
