import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchProcessor {
  batchListener(input: any): any {
    const output = input;
    return output;
  }
}
