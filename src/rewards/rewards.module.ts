import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { Reward } from './entities/reward.entity';
import { PlayerProfile } from '../profiles/entities/player-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, PlayerProfile])],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService],
})
export class RewardsModule {}
