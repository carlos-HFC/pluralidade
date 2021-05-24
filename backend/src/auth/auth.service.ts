import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ILogin } from '.';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { trimObj, validateEmail } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  async login(data: ILogin) {
    trimObj(data);
    validateEmail(data.email);

    const { email, password } = data;

    const user = await this.userService.getByEmail(email);

    if (!user || !(await user.checkPass(password))) throw new HttpException("As credenciais estão incorretas", 400);

    const token = this.createToken(user);

    return {
      user: {
        name: user.name,
        email,
        role: user.role.type,
      },
      token
    };
  }

  async validate(paylod: { email: string; }) {
    return await this.userService.getByEmail(paylod.email);
  }

  async register() { }

  private createToken(user: User) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}