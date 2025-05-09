import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(email: string, password: string) {
    const users = await this.userService.findAll({ email });

    if (users.length) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 8);

    return this.userService.create({
      email,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const [user] = await this.userService.findAll({ email }); //first element of the array

    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new BadRequestException('Invalid credentials');

    const payload = { id: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
