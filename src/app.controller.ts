import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Bu qatorni qo'shing
export class AppController {
  constructor(private readonly appService: AppService) {}
  private extractUser(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    return JSON.parse(atob(authHeader.split(' ')[1]));
  }
  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('CheckToken') // 'ChekcToken' ni 'CheckToken' ga o'zgartirdim
  getCheckToken(@Req() req) {
    return { status: 200, message: 'LOGINED', user: this.extractUser(req) };
  }
}
