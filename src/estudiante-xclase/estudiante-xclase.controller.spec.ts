import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteXclaseController } from './estudiante-xclase.controller';
import { EstudianteXclaseService } from './estudiante-xclase.service';

describe('EstudianteXclaseController', () => {
  let controller: EstudianteXclaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudianteXclaseController],
      providers: [EstudianteXclaseService],
    }).compile();

    controller = module.get<EstudianteXclaseController>(EstudianteXclaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
