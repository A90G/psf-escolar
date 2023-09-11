import { Test, TestingModule } from '@nestjs/testing';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';

describe('DomicilioEstudianteService', () => {
  let service: DomicilioEstudianteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomicilioEstudianteService],
    }).compile();

    service = module.get<DomicilioEstudianteService>(DomicilioEstudianteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
