import { Injectable } from '@nestjs/common';
import { CreateBookCommentDto } from './dto/create-book-comment.dto';
import { UpdateBookCommentDto } from './dto/update-book-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookComment } from './entities/book.schema';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name) private model: Model<BookComment>,
  ) {}

  async findAll(): Promise<BookComment[]> {
    return await this.model.find();
  }

  async findOne(id: number) {
    return this.model.findOne({ _id: id });
  }

  async create(createBookCommentDto: CreateBookCommentDto) {
    const newBookComment = new this.model(createBookCommentDto);

    return await newBookComment.save();
  }

  async update(id: number, data: UpdateBookCommentDto) {
    const bookComment = await this.model.findOne({ _id: id });

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        bookComment[key] = data[key];
      }
    }

    return await bookComment.save();
  }

  async remove(id: number) {
    const bookComment = await this.model.findOneAndRemove({ _id: id });

    return bookComment;
  }
}
