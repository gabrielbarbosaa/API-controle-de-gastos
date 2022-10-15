import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){

  }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = await bcrypt.genSalt();
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = Object.assign(createUserDto, {
      password: hash
    })

    const new_user = new this.userModel(user);

    return new_user.save()
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string){
    return this.userModel.findOne({
      email: email
    }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const saltOrRounds = await bcrypt.genSalt();
    const password = updateUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const obj = Object.assign(updateUserDto, {
      password: hash
    })
    
    await this.userModel.findByIdAndUpdate(id, obj).exec();
    
    return this.findOne(id);
  }

  async remove(id: string) {
    const delete_user = this.userModel.findOneAndDelete({_id: id}).exec();
    return (await delete_user).remove();
  }
}
