import { PipeTransform, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  async transform(value: string): Promise<string> {
    return await hash(value, 10);
  }
}
