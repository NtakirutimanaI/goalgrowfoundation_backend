import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';

describe('RegistrationsController', () => {
  let controller: RegistrationsController;

  const mockRegistrationsService = {
    createLink: jest.fn(),
    getAllLinks: jest.fn(),
    deleteLink: jest.fn(),
    getLinkBySlug: jest.fn(),
    submitRegistration: jest.fn(),
    getRegistrationsByLink: jest.fn(),
    getAllRegistrations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationsController],
      providers: [
        {
          provide: RegistrationsService,
          useValue: mockRegistrationsService,
        },
      ],
    }).compile();

    controller = module.get<RegistrationsController>(RegistrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
