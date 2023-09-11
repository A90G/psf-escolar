import { Test, TestingModule } from '@nestjs/testing';
import { DomicilioProfesorController } from './domicilio-profesor.controller';
import { DomicilioProfesorService } from './domicilio-profesor.service';

describe('DomicilioProfesorController', () => {
  let controller: DomicilioProfesorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomicilioProfesorController],
      providers: [DomicilioProfesorService],
    }).compile();

    controller = module.get<DomicilioProfesorController>(DomicilioProfesorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
