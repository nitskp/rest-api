import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserType } from './schema/user.schema';
import { Model } from 'mongoose';
import { Field } from './dto/updateUser.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserType>) {}

  async createUser(
    createUserDto: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    try {
      const hashedPassword = await argon.hash(createUserDto.password);

      const createdUser = new this.userModel({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        age: createUserDto.age,
        password: hashedPassword,
        email: createUserDto.email,
        profilePic: file.buffer,
      });
      return createdUser.save();
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async updateUser(email: string, updateField: Field) {
    return this.userModel.findOneAndUpdate(
      { email: email },
      { $set: updateField },
    );
  }

  async deleteUser(email: string): Promise<any> {
    return this.userModel.deleteMany({ email: email }).exec();
  }
}
