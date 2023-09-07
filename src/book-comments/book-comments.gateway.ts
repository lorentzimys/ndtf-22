import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { BookCommentsService } from './book-comments.service';
import { CreateBookCommentDto } from './dto/create-book-comment.dto';
import { UpdateBookCommentDto } from './dto/update-book-comment.dto';

@WebSocketGateway()
export class BookCommentsGateway {
  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('createBookComment')
  create(@MessageBody() createBookCommentDto: CreateBookCommentDto) {
    return this.bookCommentsService.create(createBookCommentDto);
  }

  @SubscribeMessage('findAllBookComments')
  findAll() {
    return this.bookCommentsService.findAll();
  }

  @SubscribeMessage('findOneBookComment')
  findOne(@MessageBody() id: number) {
    return this.bookCommentsService.findOne(id);
  }

  @SubscribeMessage('updateBookComment')
  update(@MessageBody() updateBookCommentDto: UpdateBookCommentDto) {
    return this.bookCommentsService.update(
      updateBookCommentDto.id,
      updateBookCommentDto,
    );
  }

  @SubscribeMessage('removeBookComment')
  remove(@MessageBody() id: number) {
    return this.bookCommentsService.remove(id);
  }
}
