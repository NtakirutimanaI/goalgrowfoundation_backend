import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerProfile } from './entities/player-profile.entity';
import { SponsorProfile } from './entities/sponsor-profile.entity';
import { CreatePlayerProfileDto, CreateSponsorProfileDto } from './dto/create-profile.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(PlayerProfile)
    private playerProfileRepo: Repository<PlayerProfile>,
    @InjectRepository(SponsorProfile)
    private sponsorProfileRepo: Repository<SponsorProfile>,
    private usersService: UsersService,
  ) {}

  async createPlayerProfile(userId: string, createDto: CreatePlayerProfileDto) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const profile = this.playerProfileRepo.create({
      ...createDto,
      user,
    });
    return this.playerProfileRepo.save(profile);
  }

  async getPlayerProfile(userId: string) {
    const profile = await this.playerProfileRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updatePlayerProfile(userId: string, updateDto: Partial<CreatePlayerProfileDto>) {
    const profile = await this.getPlayerProfile(userId);
    Object.assign(profile, updateDto);
    return this.playerProfileRepo.save(profile);
  }

  async createSponsorProfile(userId: string, createDto: CreateSponsorProfileDto) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const profile = this.sponsorProfileRepo.create({
      ...createDto,
      user,
    });
    return this.sponsorProfileRepo.save(profile);
  }

  async getSponsorProfile(userId: string) {
    const profile = await this.sponsorProfileRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateSponsorProfile(userId: string, updateDto: Partial<CreateSponsorProfileDto>) {
    const profile = await this.getSponsorProfile(userId);
    Object.assign(profile, updateDto);
    return this.sponsorProfileRepo.save(profile);
  }

  async deletePlayerProfile(userId: string) {
    return this.playerProfileRepo.delete({ user: { id: userId } });
  }

  async deleteSponsorProfile(userId: string) {
    return this.sponsorProfileRepo.delete({ user: { id: userId } });
  }

  async getAllPlayerProfiles() {
    return this.playerProfileRepo.find({ relations: ['user'] });
  }
}
