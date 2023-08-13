import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookModel = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  name: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
