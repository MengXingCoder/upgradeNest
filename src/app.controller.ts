import { Body, Controller, Get, Post } from '@nestjs/common';


@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'app controller'
  }                            
    
    @Post()
  test(@Body() body: any) {
    console.log('In controller, body:', body);
    throw new Error('Test exception');
  } 
}
