import { Injectable } from '@nestjs/common';
import { BookDTO } from './books.dto';

@Injectable()
export class BookService {
  getBook(id: string): BookDTO {
    return {
      id,
      name: 'The Lord of the Rings',
    };
  }
}
