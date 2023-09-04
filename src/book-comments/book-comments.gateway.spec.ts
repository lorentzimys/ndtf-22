import { Test, TestingModule } from '@nestjs/testing';
import { BookCommentsGateway } from './book-comments.gateway';
import { BookCommentsService } from './book-comments.service';

describe('BookCommentsGateway', () => {
  let gateway: BookCommentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookCommentsGateway, BookCommentsService],
    }).compile();

    gateway = module.get<BookCommentsGateway>(BookCommentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
