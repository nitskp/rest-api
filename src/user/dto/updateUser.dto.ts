import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class Field {
  @ApiProperty({type:Number, description: "User's age"})
  age?: number;

  @ApiProperty({type:String, description: "User's first name"})
  firstName?: string;

  @ApiProperty({type:String, description: "User's last name"})
  lastName?: string;
}

export class UpdateUserDto {
  @ApiProperty({ type: String, description: "User's email" })
  @IsEmail()
  email: string;
  @ApiProperty({ type: Field, description: 'Object containing fields to be updated' })
  updateField: Field;
}
