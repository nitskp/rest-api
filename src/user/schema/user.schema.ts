import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type UserType = User & Document;

export class ProfilePic {
  // @ApiProperty({ type: String, description: 'file format' })
  @IsNotEmpty()
  content: string;

  // @ApiProperty({
  //   type: 'string',
  //   format:'binary'
  // })
  @IsNotEmpty()
  data: Buffer;

  // @ApiProperty({ type: String, description: 'File Original Name' })
  @IsNotEmpty()
  fileName: string;
}

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  age: number;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ type: ProfilePic })
  profilePic: ProfilePic;
}

export const UserSchema = SchemaFactory.createForClass(User);
