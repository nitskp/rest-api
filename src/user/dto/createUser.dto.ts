import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProfilePic } from '../schema/user.schema';

export class CreateUserDto {
  @ApiProperty({ type: String, description: "User's firstname" })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: "User's lastname" })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: Number, description: "User's age" })
  @IsNotEmpty()
  age: number;

  @ApiProperty({ type: String, description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: "User's password" })
  @IsNotEmpty()
  password: string;

  // need to see how to properly integrate this with api
  @ApiProperty({ type: ProfilePic, description: 'Profile Pic field' })
  profilePic: ProfilePic;
}
