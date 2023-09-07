import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookCommentModel = HydratedDocument<BookComment>;

@Schema()
export class BookComment {
  @Prop({ required: true })
  id: 'number';

  @Prop({ required: true })
  bookId: 'number';

  @Prop({ required: true })
  comment: 'string';
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
