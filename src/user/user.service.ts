import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    const hashedPassword = await argon.hash(createUserDto.password);

    const profilePic = {
      content: file.mimetype,
      data: file.buffer,
      fileName: file.originalname,
    };

    const createdUser = new this.userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      age: createUserDto.age,
      password: hashedPassword,
      email: createUserDto.email,
      profilePic: profilePic,
    });
    return createdUser.save();
  }

  async findUser(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException(`No user with email ${email}`);
    }
    return user;
  }

  async updateUser(email: string, updateField: Field) {
    const user = await this.userModel.findOneAndUpdate(
      { email: email },
      { $set: updateField },
    );

    if (!user) {
      throw new NotFoundException(`No user with email ${email}`);
    }

    return user;
  }

  async deleteUser(email: string): Promise<any> {
    const res = await this.userModel.deleteMany({ email: email }).exec();
    if (!res.acknowledged)
      throw new InternalServerErrorException("Database didn't acknowledged");
    if (!res.deletedCount)
      throw new NotFoundException(`No user with email ${email}`);
    return res;
  }
}
