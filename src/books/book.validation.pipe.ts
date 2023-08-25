import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class BookValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw error;
    }
    return value;
  }
}
