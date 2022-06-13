import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(email: string, password: string) {
    // need to add a way to check it is not returning NOTFOUNDEXCEPTION

    const user = await this.authService.validateUser(email, password);
    // if NotExceptionfound then it will have response key. Need a better method
    // problem occuring while usign trycatch
    if (!user || user.response) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
