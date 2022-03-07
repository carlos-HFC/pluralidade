import { HttpException, Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Course } from '../course/course.model';
import { Solicitation } from '../solicitation/solicitation.model';
import { User } from '../user/user.model';

@Injectable()
export class MailService {
  constructor(
    @InjectSendGrid()
    private client: SendGridService
  ) { }

  async newUser(user: User) {
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
              subject: "Bem-vindo(a) ao Instituto Pluralidade!!",
              name: user.name,
              link: `http://localhost:3000/verifyRegister?token=${user.tokenEmailVerification}&email=${user.email}`
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async updateEmail(user: User) {
    const envelope = {
      from: "NoReply <chfcchfc@hotmail.com>",
      templateId: "",
    };

    try {
      await this.client.send({
        ...envelope,
        personalizations: [
          {
            to: user.email,
            dynamicTemplateData: {
              subject: "Confirmação de e-mail",
              name: user.name,
              link: `http://localhost:3000/verifyRegister?token=${user.tokenEmailVerification}&email=${user.email}`
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async forgotPassword(user: User) {
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
              link: `http://localhost:3000/updatePassword?token=${user.tokenResetPassword}&email=${user.email}`
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async sendSolicitation(solicitation: Solicitation) {
    const envelope = {
      from: "NoReply <chfcchfc@hotmail.com>",
      templateId: "d-eef0c36e5c1f43e28ff2253c805e9d56"
    };

    try {
      await this.client.send({
        ...envelope,
        personalizations: [
          {
            to: solicitation.email,
            dynamicTemplateData: {
              subject: "Sua solicitação foi enviada com sucesso!!",
              name: solicitation.name
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async registerCourse(user: User, course: Course) {
    const envelope = {
      from: "NoReply <chfcchfc@hotmail.com>",
      templateId: "d-c94d1642bd2d46178dedb69c61b20fe5"
    };

    const hour = {
      'M': {
        initHour: '08:00',
        endHour: '11:00',
      },
      'T': {
        initHour: '13:00',
        endHour: '16:00',
      },
      'N': {
        initHour: '18:00',
        endHour: '21:00',
      },
    }

    const initDate = format(course.initDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

    try {
      await this.client.send({
        ...envelope,
        personalizations: [
          {
            to: user.email,
            dynamicTemplateData: {
              subject: `Inscrição no curso ${course.name} efetuada com sucesso!!`,
              name: user.name,
              courseName: course.name,
              initDate,
              period: course.period,
              initHour: hour[course.period].initHour,
              endHour: hour[course.period].endHour
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}