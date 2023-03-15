import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('test')
  async getTest(@Request() req) {
    return req.user;
  }
}
