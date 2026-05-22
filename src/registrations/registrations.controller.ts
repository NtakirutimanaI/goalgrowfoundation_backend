import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  // Public Endpoints
  @Get('link/:slug')
  getLink(@Param('slug') slug: string) {
    return this.registrationsService.getLinkBySlug(slug);
  }

  @Post('submit/:slug')
  submit(@Param('slug') slug: string, @Body() data: any) {
    return this.registrationsService.submitRegistration(slug, data);
  }

  // Admin Endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('links')
  createLink(@Body() data: any) {
    return this.registrationsService.createLink(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('links')
  getAllLinks() {
    return this.registrationsService.getAllLinks();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('links/:id')
  deleteLink(@Param('id') id: string) {
    return this.registrationsService.deleteLink(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('by-link/:linkId')
  getRegistrations(@Param('linkId') linkId: string) {
    return this.registrationsService.getRegistrationsByLink(linkId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('all')
  getAllRegistrations() {
    return this.registrationsService.getAllRegistrations();
  }
}
