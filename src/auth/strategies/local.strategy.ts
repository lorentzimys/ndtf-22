import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { PasswordHashPipe } from 'src/common/pipes/passwordHash.pipe';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private passwordHashService: PasswordHashPipe,
  ) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.userService.getByLogin(login);
    const passwordMatch = await this.passwordHashService.compare(
      password,
      user.password,
    );

    if (user && passwordMatch) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
