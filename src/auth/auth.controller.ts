import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  signin(@Request() req: any) {
    Logger.debug('User',req.user)
    return this.authService.signin(req.user);
  }
}
