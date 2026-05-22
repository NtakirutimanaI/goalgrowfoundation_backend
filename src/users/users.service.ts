import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.usersRepository.findOne({ where: { email: email.toLowerCase().trim() } });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User> & { password?: string }): Promise<User> {
    if (userData.email) {
      userData.email = userData.email.toLowerCase().trim();
      const existingUser = await this.findOneByEmail(userData.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const { password, ...data } = userData;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      data.passwordHash = await bcrypt.hash(password, salt);
    }
    
    const newUser = this.usersRepository.create(data);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'role', 'fullName', 'phone', 'address', 'avatarUrl', 'createdAt']
    });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, updateDto: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return null;
    Object.assign(user, updateDto);
    return this.usersRepository.save(user);
  }
}
