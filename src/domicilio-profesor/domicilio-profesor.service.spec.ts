import { Test, TestingModule } from '@nestjs/testing';
import { DomicilioProfesorService } from './domicilio-profesor.service';

describe('DomicilioProfesorService', () => {
  let service: DomicilioProfesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomicilioProfesorService],
    }).compile();

    service = module.get<DomicilioProfesorService>(DomicilioProfesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
