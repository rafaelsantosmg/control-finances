import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from './local.auth';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [PassportModule, JwtModule],
  providers: [AuthService, UsersService, LocalStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
