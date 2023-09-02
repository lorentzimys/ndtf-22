import { Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { SignUpDTO } from './dto/auth.dto';
import { UserAlreadyExistsException } from 'src/common/exceptions/userExist.exception';
import { omit } from 'lodash';
import { PasswordHashPipe } from 'src/common/pipes/passwordHash.pipe';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordHashService: PasswordHashPipe,
  ) {}

  async validateUser(login: string, password: string): Promise<UserDTO> {
    const user = await this.userService.getByLogin(login);
    const hashedPassword = await this.passwordHashService.transform(password);

    console.log(hashedPassword);

    if (user && user.password === hashedPassword) {
      return user;
    }

    return null;
  }

  async register(user: SignUpDTO): Promise<Omit<UserDTO, 'password'>> {
    const userExists = await this.userService.getByLogin(user.login);

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    const createdUser = await this.userService.createUser(user);

    return omit(createdUser, ['password']);
  }

  async login(@Request() req) {
    const {
      user: { login, email },
    } = req;
    const payload = { login, email };

    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
