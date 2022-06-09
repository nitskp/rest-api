import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './intefaces/user.interace';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':email')
  findUser(@Param('email') email: string): User {
    return this.userService.findUser(email);
  }

  @Post()
  createUser(@Body() userDto: UserDto): User {
    return this.userService.createUser(userDto);
  }

  @Put()
  updateUser(): string {
    return `User details updated`;
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string): User[] {
    return this.userService.deleteUser(email);
  }
}
