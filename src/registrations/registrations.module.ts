import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { RegistrationLink } from './entities/registration-link.entity';
import { Registration } from './entities/registration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegistrationLink, Registration])
  ],
  providers: [RegistrationsService],
  controllers: [RegistrationsController]
})
export class RegistrationsModule {}
