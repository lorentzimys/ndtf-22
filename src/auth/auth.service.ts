import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { SignInDTO, SignUpDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(data: SignUpDTO) {
    console.log('signup', { ...data });

    return Promise.resolve(true);
  }

  async signin(data: SignInDTO) {
    console.log('signin', { ...data });

    return Promise.resolve(true);
  }
}
