import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('apiv1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('initial')
  getHello(): string {
    return this.appService.getHello();
  }
}