import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from './entities/competition.entity';
import { CreateCompetitionDto } from './dto/create-competition.dto';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private competitionsRepo: Repository<Competition>,
  ) {}

  async create(createDto: CreateCompetitionDto) {
    const competition = this.competitionsRepo.create(createDto);
    return this.competitionsRepo.save(competition);
  }

  async findAll() {
    return this.competitionsRepo.find();
  }

  async findOne(id: string) {
    const competition = await this.competitionsRepo.findOne({ where: { id } });
    if (!competition) throw new NotFoundException('Competition not found');
    return competition;
  }

  async update(id: string, updateDto: Partial<CreateCompetitionDto>) {
    const competition = await this.findOne(id);
    Object.assign(competition, updateDto);
    return this.competitionsRepo.save(competition);
  }

  async delete(id: string): Promise<void> {
    await this.competitionsRepo.delete(id);
  }
}
