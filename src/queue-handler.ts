import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueHandler {
  handleMessage(message: any): any {
    return message;
  }
}
