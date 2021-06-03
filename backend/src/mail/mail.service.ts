import { HttpException, Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

import { User } from '../user/user.model';

@Injectable()
export class MailService {
  constructor(
    @InjectSendGrid()
    private client: SendGridService
  ) { }

  async storeUser(user: User) {
    const envelope = {
      from: "NoReply <chfcchfc@hotmail.com>",
      templateId: "d-10f2eb9ca24e40a6b4e785fa729ab945",
    };

    try {
      await this.client.send({
        ...envelope,
        personalizations: [
          {
            to: user.email,
            dynamicTemplateData: {
              subject: "Bem-vindo",
              name: user.name,
              link: "http://localhost:3000"
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async forgotPass(user: User, token: string) {
    const envelope = {
      from: "NoReply <chfcchfc@hotmail.com>",
      templateId: "d-b0828206bd434efcbe876c8ad8585c3a"
    };

    try {
      await this.client.send({
        ...envelope,
        personalizations: [
          {
            to: user.email,
            dynamicTemplateData: {
              subject: "Esqueceu a senha?",
              name: user.name,
              link: "http://localhost:3000",
              token
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }
}