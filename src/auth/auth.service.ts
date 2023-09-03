import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { SignUpDTO } from './dto/auth.dto';
import { UserAlreadyExistsException } from 'src/common/exceptions/userExist.exception';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(passportUser: UserDTO) {
    const { login, email } = passportUser;
    const payload = { login, email };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: SignUpDTO): Promise<Omit<UserDTO, 'password'>> {
    const userExists = await this.userService.getByLogin(user.login);

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    const createdUser = await this.userService.createUser(user);

    return omit(createdUser, ['password']);
  }
}
