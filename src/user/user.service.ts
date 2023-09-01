import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async getById(id: string): Promise<User> {
    return (await this.model.findOne({ _id: id })).toObject();
  }

  async getByLogin(login: string): Promise<User> {
    return (await this.model.findOne({ login })).toObject();
  }

  async getByEmail(email: string): Promise<User> {
    return (await this.model.findOne({ email })).toObject();
  }

  async createUser(data: UserDTO): Promise<User> {
    const newUser = new this.model(data);

    return (await newUser.save()).toObject();
  }
}
