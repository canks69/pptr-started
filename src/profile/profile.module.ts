import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PuppeteerModule } from 'nestjs-pptr';

@Module({
  imports: [
    PuppeteerModule.forRoot({ launchOptions: { headless: false, slowMo: 20 } }),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
