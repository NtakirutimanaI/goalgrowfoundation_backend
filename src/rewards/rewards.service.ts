import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { AssignRewardDto } from './dto/assign-reward.dto';
import { PlayerProfile } from '../profiles/entities/player-profile.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepo: Repository<Reward>,
    @InjectRepository(PlayerProfile)
    private playerProfileRepo: Repository<PlayerProfile>,
  ) {}

  async assignReward(assignDto: AssignRewardDto) {
    let player: PlayerProfile | null = null;
    if (assignDto.assignedPlayerId) {
      player = await this.playerProfileRepo.findOne({ where: { user: { id: assignDto.assignedPlayerId } }, relations: ['user'] });
      if (!player) throw new NotFoundException('Player profile not found');
    }

    const reward = this.rewardsRepo.create({
      title: assignDto.title,
      description: assignDto.description,
      points: assignDto.points,
      assignedPlayer: player,
    });
    return this.rewardsRepo.save(reward);
  }

  async getMyRewards(userId: string) {
    const player = await this.playerProfileRepo.findOne({ where: { user: { id: userId } } });
    if (!player) throw new NotFoundException('Player profile not found');

    return this.rewardsRepo.find({ where: { assignedPlayer: { id: player.id } } });
  }

  async getAllRewards() {
    return this.rewardsRepo.find({ relations: ['assignedPlayer', 'assignedPlayer.user'] });
  }

  async delete(id: string): Promise<void> {
    await this.rewardsRepo.delete(id);
  }

  async update(id: string, updateDto: Partial<AssignRewardDto>) {
    const reward = await this.rewardsRepo.findOne({ where: { id }, relations: ['assignedPlayer'] });
    if (!reward) throw new NotFoundException('Reward not found');
    
    if (updateDto.assignedPlayerId !== undefined) {
      if (updateDto.assignedPlayerId === null) {
        reward.assignedPlayer = null;
      } else {
        const player = await this.playerProfileRepo.findOne({ where: { user: { id: updateDto.assignedPlayerId } } });
        if (player) reward.assignedPlayer = player;
      }
    }
    
    if (updateDto.title) reward.title = updateDto.title;
    if (updateDto.description) reward.description = updateDto.description;
    if (updateDto.points !== undefined) reward.points = updateDto.points;

    return this.rewardsRepo.save(reward);
  }
}
