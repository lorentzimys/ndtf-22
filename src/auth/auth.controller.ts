import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/auth.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { UserDTO } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller(`/api/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(`signup`)
  async signup(@Body() user: SignUpDTO): Promise<Omit<UserDTO, 'password'>> {
    console.log(user);
    return await this.authService.register(user);
  }

  @UseGuards(JWTAuthGuard)
  @Post(`signin`)
  async signin(@Request() req) {
    console.log(req.user);
    return await this.authService.login(req.user);
  }
}
