import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File
  ): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto, file);
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
