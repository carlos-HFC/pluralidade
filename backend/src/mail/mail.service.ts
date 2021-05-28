import { HttpException, Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { User } from 'src/user/user.model';

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
      html: `
      <h1>Esqueceu a senha?</h1>
      <span>Não se preocupe, siga os passos abaixo</span>
      
      <ol>
        <li>Entre nessa <a href="">página</a></li>
        <li>Copie o token ao lado ${token}</li>
        <li>Cole o token no campo correspondente</li>
        <li>Clique em confirmar</li>
      </ol>
      
      <p><strong>Lembre-se:</strong> Você só tem 1 hora para concluir essa ação para o token não expirar</p>
      `,
      subject: "Esqueci a senha",
      to: user.email
    };

    try {
      await this.client.send({
        ...envelope
      });
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }
}