import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService){}
  async signin(email: string, password: string) {

    return 'hello';
  }
}
