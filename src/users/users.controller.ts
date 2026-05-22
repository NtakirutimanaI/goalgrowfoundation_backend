import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Post()
  createUser(@Body() createDto: any) {
    return this.usersService.create(createDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Patch('me')
  updateMe(@Request() req, @Body() updateDto: any) {
    return this.usersService.update(req.user.id, updateDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateDto: any) {
    return this.usersService.update(id, updateDto);
  }
}
