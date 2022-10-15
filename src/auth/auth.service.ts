import { CreateUserDto } from './../users/dto/create-user.dto';
import { Exceptions } from './auth.exceptions';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

interface IProps {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser({ email, password }: IProps) {
    const user = await this.usersService.findByEmail(email);

    if (!user) Exceptions.EmailIsNotFound();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) Exceptions.InvalidPassword();

    return !!user && isMatch ? user : null;
  }

  async singUp(user: CreateUserDto){
    const existingEmail = await this.usersService.findByEmail(user.email);
    
    if(!!existingEmail === true) Exceptions.EmailAlreadyRegistred();

    return await this.usersService.create(user);

  }

  
}
