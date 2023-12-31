import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { WrapResponseInterceptor } from './common/interceptors/wrapResponse.interceptor';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_CONNECTION_STRING,
      }),
    }),
    AuthModule,
    BooksModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, WrapResponseInterceptor],
})
export class AppModule {}
