import { PipeTransform, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  async transform(value: string): Promise<string> {
    return await hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isEqual = await compare(value, hash);

    return isEqual;
  }
}
