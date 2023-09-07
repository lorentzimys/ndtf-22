import { Module } from '@nestjs/common';
import { BookCommentsService } from './book-comments.service';
import { BookCommentsGateway } from './book-comments.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { BookComment, BookCommentSchema } from './entities/book.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: BookComment.name,
        useFactory: () => BookCommentSchema,
      },
    ]),
  ],
  providers: [BookCommentsGateway, BookCommentsService],
})
export class BookCommentsModule {}
