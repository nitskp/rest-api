import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signin(email: string, password: string) {
    try {
      const user: CreateUserDto = await this.userService.findUser(email);
      await argon.verify(user.password, password);
      return true;
    } catch (error) {
      return error;
    }
    return 'hello';
  }
}
