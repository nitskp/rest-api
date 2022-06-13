import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiBody({ type: LoginUserDto })
  @ApiForbiddenResponse({ description: 'Incorrect Password or email' })
  @ApiOkResponse({ description: 'Token successfully created' })
  signin(@Request() req: any) {
    return this.authService.signin(req.user);
  }
}
