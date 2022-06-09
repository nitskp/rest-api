import { Injectable } from '@nestjs/common';
import { User } from './intefaces/user.interace';
import * as Data from './randomData/randomData.json';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private user: User;

  createUser(user: User) {
    this.user = user;
    return this.user;
  }

  findUser(email: string) {
    const users = Data.users;
    const user = users.find((user) => user.email === email);
    return user;
  }

  deleteUser(email: string) {
    const users = Data.users;
    const newUsers = users.filter((user) => user.email !== email);
    return newUsers;
  }
}
