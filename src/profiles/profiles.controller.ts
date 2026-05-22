import { Controller, Post, Get, Patch, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreatePlayerProfileDto, CreateSponsorProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Roles(Role.Player)
  @Post('player')
  createPlayerProfile(@Request() req, @Body() createDto: CreatePlayerProfileDto) {
    return this.profilesService.createPlayerProfile(req.user.id, createDto);
  }

  @Roles(Role.Player, Role.Admin)
  @Get('player')
  getPlayerProfile(@Request() req) {
    return this.profilesService.getPlayerProfile(req.user.id);
  }

  @Roles(Role.Player)
  @Patch('player')
  updatePlayerProfile(@Request() req, @Body() updateDto: Partial<CreatePlayerProfileDto>) {
    return this.profilesService.updatePlayerProfile(req.user.id, updateDto);
  }

  @Roles(Role.Player, Role.Admin)
  @Delete('player')
  deletePlayerProfile(@Request() req) {
    return this.profilesService.deletePlayerProfile(req.user.id);
  }

  @Roles(Role.Sponsor)
  @Post('sponsor')
  createSponsorProfile(@Request() req, @Body() createDto: CreateSponsorProfileDto) {
    return this.profilesService.createSponsorProfile(req.user.id, createDto);
  }

  @Roles(Role.Sponsor, Role.Admin)
  @Get('sponsor')
  getSponsorProfile(@Request() req) {
    return this.profilesService.getSponsorProfile(req.user.id);
  }

  @Roles(Role.Sponsor)
  @Patch('sponsor')
  updateSponsorProfile(@Request() req, @Body() updateDto: Partial<CreateSponsorProfileDto>) {
    return this.profilesService.updateSponsorProfile(req.user.id, updateDto);
  }

  @Roles(Role.Sponsor, Role.Admin)
  @Delete('sponsor')
  deleteSponsorProfile(@Request() req) {
    return this.profilesService.deleteSponsorProfile(req.user.id);
  }

  @Roles(Role.Admin, Role.Sponsor)
  @Get('players/all')
  getAllPlayerProfiles() {
    return this.profilesService.getAllPlayerProfiles();
  }
}
