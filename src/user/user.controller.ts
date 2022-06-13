import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  @ApiFoundResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found response' })
  @ApiInternalServerErrorResponse({ description: "Couldn't create the user" })
  @ApiOkResponse({ description: 'User found' })
  @ApiBearerAuth()
  async findUser(@Param('email') email: string) {
    return this.userService.findUser(email);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: CreateUserDto, description: 'Data needed to added to user' })
  @ApiCreatedResponse({ description: 'User has been successfully created' })
  @ApiInternalServerErrorResponse({ description: "Couldn't create the user" })
  @ApiConsumes('multipart/form-data')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiFoundResponse({ description: 'User has been found and updated' })
  @ApiOkResponse({ description: 'User has been updated' })
  @ApiInternalServerErrorResponse({ description: "Couldn't create the user" })
  @ApiBearerAuth()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const email = updateUserDto.email;
    const updateField = updateUserDto.updateField;
    return this.userService.updateUser(email, updateField);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  @ApiOkResponse({ description: 'User has been deleted' })
  @ApiNotFoundResponse({ description: "User couldn't be found" })
  @ApiInternalServerErrorResponse({ description: "Couldn't create the user" })
  @ApiBearerAuth()
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
