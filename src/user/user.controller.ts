import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDTO } from './dto/user.dto';
import { omit } from 'lodash';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getById(id);
    return omit(user, 'password');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userService.getAllUsers();

    return users.map((user) => omit(user, 'password'));
  }

  @Post()
  async createUser(@Body() user: UserDTO): Promise<Omit<User, 'password'>> {
    const createdUser = await this.userService.createUser(user);

    return omit(createdUser, 'password');
  }
}
