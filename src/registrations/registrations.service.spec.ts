import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsService } from './registrations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegistrationLink } from './entities/registration-link.entity';
import { Registration } from './entities/registration.entity';

describe('RegistrationsService', () => {
  let service: RegistrationsService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationsService,
        {
          provide: getRepositoryToken(RegistrationLink),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Registration),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RegistrationsService>(RegistrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
