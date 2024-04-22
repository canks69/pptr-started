import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly prifilrSerfice: ProfileService) {}

  @Get()
  getProfile(): Promise<String> {
    return this.prifilrSerfice.getProfile();
  }
}
