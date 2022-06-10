import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserType } from './schema/user.schema';
import { Model } from 'mongoose';
import { Field } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserType>) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(CreateUserDto);
    return createdUser.save();
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
