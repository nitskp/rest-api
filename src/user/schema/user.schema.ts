import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserType = User & Document;

class ProfilePic {
  content: string;
  data: Buffer;
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
  // need to see how to add more than one field in the schema
  @Prop({ type: ProfilePic })
  profilePic: ProfilePic;
}

export const UserSchema = SchemaFactory.createForClass(User);
