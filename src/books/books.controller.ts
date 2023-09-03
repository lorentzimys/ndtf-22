import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { BookValidationPipe } from './book.validation.pipe';
import { bookValidationSchema } from './schemas/book.validation.schema';
import { UpdateBookDTO } from './dto/book.dto';
import { HttpExceptionFilter } from '../common/filters/exception.filter';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.bookService.getBooks();
  }

  @Post()
  async createBook(@Body() body: Book): Promise<Book> {
    return this.bookService.createBook(body);
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getBook(id);
  }

  @Put(':id')
  @UseFilters(new HttpExceptionFilter())
  async updateBook(
    @Param('id') id: string,
    @Body(new BookValidationPipe(bookValidationSchema)) body: UpdateBookDTO,
  ): Promise<Book> {
    return await this.bookService.updateBook(id, body);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.deleteBook(id);
  }
}
