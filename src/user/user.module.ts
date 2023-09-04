import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { PasswordHashPipe } from 'src/common/pipes/passwordHash.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, PasswordHashPipe],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
