import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Exceptions } from './auth.exceptions';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yqh62qj9',
      signOptions: {expiresIn: '24h'},
    }),
    PassportModule,
    UsersModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, Exceptions],
  exports: [AuthService, JwtModule, Exceptions]
})
export class AuthModule {}
