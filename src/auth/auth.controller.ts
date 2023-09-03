import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(`/api/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post(`signin`)
  async signin(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post(`signup`)
  async signup(@Body() user): Promise<Omit<UserDTO, 'password'>> {
    return await this.authService.register(user);
  }
}
