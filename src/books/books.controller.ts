import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './books.service';
import { BookDTO } from './books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  getBook(@Param('id') id: string): BookDTO {
    return this.bookService.getBook(id);
  }
}
