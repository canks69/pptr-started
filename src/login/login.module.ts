import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PuppeteerModule } from 'nestjs-pptr';

@Module({
  imports: [
    PuppeteerModule.forRoot({ launchOptions: { headless: false, slowMo: 20 } }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
