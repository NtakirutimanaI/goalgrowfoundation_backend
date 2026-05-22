import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('competitions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createDto: CreateCompetitionDto) {
    return this.competitionsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.competitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<CreateCompetitionDto>) {
    return this.competitionsService.update(id, updateDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.competitionsService.delete(id);
  }
}
