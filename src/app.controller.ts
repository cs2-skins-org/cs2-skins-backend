import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Root route controller (i.e., '/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Handles GET requests to the root URL ('/')
  @Get()
  getHello(): string {
    return this.appService.getHello(); // Returns a simple greeting from the service
  }
}
