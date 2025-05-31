import { Injectable } from '@nestjs/common';

// This service is injectable and can be provided in any module
@Injectable()
export class AppService {
  // A simple method that returns a greeting string
  getHello(): string {
    return 'Hello World!';
  }
}
