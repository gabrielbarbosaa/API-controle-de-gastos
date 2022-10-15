import { CreateUserDto } from './../users/dto/create-user.dto';
import { SignInDTO } from './dto/session.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('/')
export class SessionController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('authorize')
  async postAuthorize(@Body() data: SignInDTO) {
    const user = await this.authService.validateUser(data);
    const payload = { 
        id: user.id,
        name: user.name,
        email: user.email
    }

    return {user, token: this.jwtService.sign(payload)}
  }

  @Post('singup')
  async postSingUp(@Body() user: CreateUserDto){
    return await this.authService.singUp(user);
  }
}