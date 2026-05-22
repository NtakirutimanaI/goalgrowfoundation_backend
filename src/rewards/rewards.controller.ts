import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { AssignRewardDto } from './dto/assign-reward.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('rewards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Roles(Role.Admin)
  @Post('assign')
  assignReward(@Body() assignDto: AssignRewardDto) {
    return this.rewardsService.assignReward(assignDto);
  }

  @Roles(Role.Player)
  @Get('my')
  getMyRewards(@Request() req) {
    return this.rewardsService.getMyRewards(req.user.id);
  }

  @Roles(Role.Admin, Role.Sponsor)
  @Get('all')
  getAllRewards() {
    return this.rewardsService.getAllRewards();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteReward(@Param('id') id: string) {
    return this.rewardsService.delete(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  updateReward(@Param('id') id: string, @Body() updateDto: Partial<AssignRewardDto>) {
    return this.rewardsService.update(id, updateDto);
  }
}
