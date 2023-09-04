import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { UserDTO } from './dto/user.dto';
import { PasswordHashPipe } from 'src/common/pipes/passwordHash.pipe';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private readonly passwordHashService: PasswordHashPipe,
  ) {}

  async getById(id: string): Promise<User> {
    const user = await this.model.findOne({ _id: id });

    if (user) {
      return user.toObject();
    }

    return null;
  }

  async getByLogin(login: string): Promise<User> {
    const user = await this.model.findOne({ login });

    if (user) {
      return user.toObject();
    }

    return null;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.model.findOne({ email });

    if (user) {
      return user.toObject();
    }

    return null;
  }

  async createUser(data: UserDTO): Promise<User> {
    const hashedPassword = await this.passwordHashService.transform(
      data.password,
    );
    const newUser = new this.model({
      ...data,
      password: hashedPassword,
    });

    return (await newUser.save()).toObject();
  }

  async getAllUsers(): Promise<User[]> {
    return (await this.model.find()).map((user) => user.toObject());
  }
}
