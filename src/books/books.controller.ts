import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    try {
      return await this.bookService.getBooks();
    } catch (err) {
      return err;
    }
  }

  @Post()
  async createBook(@Body() body: Book): Promise<Book> {
    try {
      const newBook = this.bookService.createBook(body);
      return newBook;
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getBook(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Book> {
    try {
      const book = await this.bookService.getBook(id);

      if (!book) {
        res.status(404).send('Book not found');
      }

      return book;
    } catch (err) {
      res.status(500).send(err);
    }
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() body: Book): Promise<Book> {
    try {
      const updatedBook = await this.bookService.updateBook(id, body);
      return updatedBook;
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async deleteBook(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Book> {
    try {
      const deletedBook = await this.bookService.deleteBook(id);

      if (!deletedBook) {
        res.status(404).send('Book with given id does not exist');
      }

      return deletedBook;
    } catch (err) {
      throw err;
    }
  }
}
