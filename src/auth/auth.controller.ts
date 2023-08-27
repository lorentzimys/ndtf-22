import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto/auth.dto';

@Controller(`/api/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`signup`)
  async signup() {
    const mockData: SignUpDTO = {
      email: 'lorentzimys@yandex.ru',
      password: 'testpass',
      firstName: 'Alex',
      lastName: 'Stepanov',
    };

    return await this.authService.signup(mockData);
  }

  @Post(`signin`)
  async signin() {
    const mockData: SignInDTO = {
      email: 'lorentzimys@yandex.ru',
      password: 'testpass',
    };

    return await this.authService.signin(mockData);
  }
}
