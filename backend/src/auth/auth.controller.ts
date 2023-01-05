import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() body: any) {
    return this.authService.validateUser(body.email, body.password);
  }
}
