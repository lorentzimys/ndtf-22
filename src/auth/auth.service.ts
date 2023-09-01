import { Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<UserDTO> {
    const user = await this.userService.getByLogin(login);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(@Request() req) {
    const {
      user: { login, email },
    } = req;
    const payload = { login, email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
