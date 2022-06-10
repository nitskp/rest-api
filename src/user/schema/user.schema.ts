import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserType = User & Document;

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
  // need to see how to add more than one field in the schema
  @Prop()
  profilePic: Buffer
}

export const UserSchema = SchemaFactory.createForClass(User);
