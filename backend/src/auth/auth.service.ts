import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User or password is incorrect');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('User or password is incorrect');
    }

    const { access_token } = await this.getToken(user);

    return { data: { user: { id: user.id, email: user.email }, access_token } };
  }

  async getToken(user: User) {
    const payload = { email: user.email, sub: user.id };

    const SECRET = {
      secret: 'topSecret512',
      expiresIn: '30d',
    };

    return {
      access_token: this.jwtService.sign(payload, SECRET),
    };
  }
}
