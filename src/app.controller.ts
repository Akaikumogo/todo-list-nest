import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Bu qatorni qo'shing
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('CheckToken') // 'ChekcToken' ni 'CheckToken' ga o'zgartirdim
  getCheckToken() {
    return { status: 200, message: '' };
  }
}
