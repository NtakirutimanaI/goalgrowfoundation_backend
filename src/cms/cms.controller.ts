import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get(':page')
  getByPage(@Param('page') page: string) {
    return this.cmsService.findByPage(page);
  }

  @Get()
  getAll() {
    return this.cmsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Patch(':id')
  update(@Param('id') id: string, @Body('value') value: string) {
    return this.cmsService.update(id, value);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  upsert(@Body() data: any) {
    return this.cmsService.upsert(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('seed')
  seed() {
    return this.cmsService.seed();
  }
}
