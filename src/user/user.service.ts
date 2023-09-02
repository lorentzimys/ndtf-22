import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

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
    const newUser = new this.model(data);

    return (await newUser.save()).toObject();
  }

  async getAllUsers(): Promise<User[]> {
    return (await this.model.find()).map((user) => user.toObject());
  }
}
