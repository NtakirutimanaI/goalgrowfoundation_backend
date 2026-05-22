import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationLink } from './entities/registration-link.entity';
import { Registration } from './entities/registration.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(RegistrationLink)
    private linksRepo: Repository<RegistrationLink>,
    @InjectRepository(Registration)
    private registrationsRepo: Repository<Registration>,
  ) {}

  // Link Management (Admin)
  async createLink(data: any) {
    const link = this.linksRepo.create(data);
    return this.linksRepo.save(link);
  }

  async getAllLinks() {
    return this.linksRepo.find({ order: { createdAt: 'DESC' } });
  }

  async deleteLink(id: string) {
    return this.linksRepo.delete(id);
  }

  // Registration Logic (Public)
  async getLinkBySlug(slug: string) {
    const link = await this.linksRepo.findOne({ where: { slug, isActive: true } });
    if (!link) throw new NotFoundException('Registration link not found or inactive');
    return link;
  }

  async submitRegistration(slug: string, data: any) {
    const link = await this.getLinkBySlug(slug);
    const registration = this.registrationsRepo.create({
      ...data,
      linkId: link.id,
    });
    return this.registrationsRepo.save(registration);
  }

  // Reporting (Admin)
  async getRegistrationsByLink(linkId: string) {
    return this.registrationsRepo.find({
      where: { linkId },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllRegistrations() {
    return this.registrationsRepo.find({
      relations: ['link'],
      order: { createdAt: 'DESC' },
    });
  }
}
