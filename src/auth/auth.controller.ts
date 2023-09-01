import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(`/api/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post(`signup`)
  // async signup(
  //   @Body() user: UserDTO,
  // ): Promise<Omit<UserDTO, 'password'>> {
  //   // return await this.authService.signup(mockData);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post(`signin`)
  async signin() {
    const mockData: SignInDTO = {
      login: 'testuser',
      email: 'test@yandex.ru',
      password: 'testpass',
    };

    return await this.authService.login(
      mockData.email,
      mockData.password,
    );
  }
}
