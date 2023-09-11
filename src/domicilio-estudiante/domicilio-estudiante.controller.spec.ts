import { Test, TestingModule } from '@nestjs/testing';
import { DomicilioEstudianteController } from './domicilio-estudiante.controller';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';

describe('DomicilioEstudianteController', () => {
  let controller: DomicilioEstudianteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomicilioEstudianteController],
      providers: [DomicilioEstudianteService],
    }).compile();

    controller = module.get<DomicilioEstudianteController>(DomicilioEstudianteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
