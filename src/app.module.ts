import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { WrapResponseInterceptor } from './common/interceptors/wrapResponse.interceptor';
import { AuthModule } from './auth/auth.module';

const MONGO_CONNECTION_STRING =
  'mongodb+srv://user:testuser@cluster0.ewhx6zd.mongodb.net/ndtf?retryWrites=true&replicaSet=atlas-cspp6l-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1';
@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION_STRING),
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, WrapResponseInterceptor],
})
export class AppModule {}
