import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @EventPattern('hello')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text);
  }
}
