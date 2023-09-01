import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDTO } from './dto/user.dto';
import { PasswordHashPipe } from 'src/common/pipes/passwordHash.pipe';
import { omit } from 'lodash';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getById(id);
    return omit(user, 'password');
  }

  @Post()
  async createUser(
    @Body() user: UserDTO,
    @Body('password', PasswordHashPipe) password: string,
  ): Promise<Omit<User, 'password'>> {
    const createdUser = await this.userService.createUser({
      ...user,
      password,
    });

    return omit(createdUser, 'password');
  }
}