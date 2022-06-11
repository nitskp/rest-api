import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    try {
      const user: CreateUserDto = await this.userService.findUser(email);
      if (await argon.verify(user.password, password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return error;
    }
  }

  signin(user: CreateUserDto) {
    const payload = { email: user.email, password: user.password };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
