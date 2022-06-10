import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':email')
  async findUser(@Param('email') email: string): Promise<CreateUserDto> {
    return this.userService.findUser(email);
  }

  // can't understand why async functions have to return promises only. Cant we await inside async
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<any> {
    const email = updateUserDto.email;
    const updateField = updateUserDto.updateField;
    return this.userService.updateUser(email, updateField);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string): Promise<any> {
    return this.userService.deleteUser(email);
  }
}
