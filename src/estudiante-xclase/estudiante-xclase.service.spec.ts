import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteXclaseService } from './estudiante-xclase.service';

describe('EstudianteXclaseService', () => {
  let service: EstudianteXclaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudianteXclaseService],
    }).compile();

    service = module.get<EstudianteXclaseService>(EstudianteXclaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
