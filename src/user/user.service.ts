import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    console.log('Sukaaa blya', existingUser);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };

    const user = new this.userModel(newUser);
    return user.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const userbyEmail = await this.userModel
      .findOne({ email: loginUserDto.email })
      .exec();
    if (!userbyEmail) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      userbyEmail.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const now = new Date();
    const expDate = new Date(now.getTime() + 60 * 60 * 1000);
    const payload = {
      email: userbyEmail.email,
      sub: userbyEmail._id,
      expDate,
    };
    const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');

    return { accessToken };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        updateUserDto.id,
        { ...updateUserDto, password: hashedPassword },
        { new: true },
      )
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUserById(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
