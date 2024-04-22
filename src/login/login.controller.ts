import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginPage } from '../../common/models';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: LoginPage) {
    return this.loginService.login(body);
  }
}
