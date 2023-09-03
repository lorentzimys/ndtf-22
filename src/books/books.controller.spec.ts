/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksService } from './books.service';
import { CreateBookDTO, UpdateBookDTO } from './dto/book.dto';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const mockBook = {
      _id: '1',
      name: 'Test Book',
    };

    const booksService = {
      getBooks: async () => [mockBook],
      getBook: async (id: string) => mockBook,
      createBook: async (data: CreateBookDTO) => data,
      updateBook: async (id: string, data: UpdateBookDTO) => ({
        ...mockBook,
        ...data,
      }),
      deleteBook: async (id: string) => mockBook,
    };

    const module = await Test.createTestingModule({
      imports: [],
      providers: [BooksService],
      controllers: [BooksController],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    controller = module.get<BooksController>(BooksController);

    await module.createNestApplication().init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should GET (/books)', async () => {
    const books = await controller.getBooks();

    expect(books).toHaveLength(1);
  });

  it('should GET (/books/:id)', async () => {
    const book = await controller.getBook('1');

    expect(book).toHaveProperty('name');
  });

  it('should POST (/books)', async () => {
    const book = await controller.createBook({
      name: 'Test Book',
    });

    expect(book).toHaveProperty('name');
    expect(book['name']).toEqual('Test Book');
  });

  it('should PUT (/books/:id)', async () => {
    const book = await controller.updateBook('1', {
      name: 'Updated Book',
    });

    expect(book).toHaveProperty('name');
    expect(book['name']).toEqual('Updated Book');
  });

  it('should DELETE (/books/:id)', async () => {
    const book = await controller.deleteBook('1');

    expect(book).toHaveProperty('name');
  });
});
