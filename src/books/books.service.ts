import { Injectable } from '@nestjs/common';
import { Book, BookModel } from './schemas/book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDTO, UpdateBookDTO } from './dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getBooks(): Promise<BookModel[]> {
    return this.bookModel.find();
  }

  async getBook(id: string): Promise<BookModel> {
    return await this.bookModel.findOne({ _id: id });
  }

  async createBook(data: CreateBookDTO): Promise<Book> {
    const newBook = new this.bookModel(data);

    return newBook.save();
  }

  async updateBook(id: string, data: UpdateBookDTO): Promise<BookModel> {
    const book = await this.bookModel.findOne({ _id: id });

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        book[key] = data[key];
      }
    }

    return await book.save();
  }

  async deleteBook(id: string): Promise<BookModel> {
    const book = await this.bookModel.findOneAndRemove({ _id: id });

    return book;
  }
}
