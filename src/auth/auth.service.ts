import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../users/enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    const newUser = await this.usersService.create({
      email: registerDto.email,
      passwordHash,
      fullName: registerDto.fullName,
      phone: registerDto.phone,
      address: registerDto.address,
      role: Role.User,
    });

    const { passwordHash: _, ...result } = newUser;
    return result;
  }

  async changePassword(userId: string, data: any) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(data.currentPassword, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Current password incorrect');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.newPassword, salt);

    await this.usersService.update(userId, { passwordHash });
    return { message: 'Password updated successfully' };
  }
}
