import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ type: String, description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: "User's password" })
  @IsNotEmpty()
  password: string;
}
