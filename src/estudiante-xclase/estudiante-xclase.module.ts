import { Module } from '@nestjs/common';
import { EstudianteXclaseService } from './estudiante-xclase.service';
import { EstudianteXclaseController } from './estudiante-xclase.controller';

@Module({
  controllers: [EstudianteXclaseController],
  providers: [EstudianteXclaseService],
})
export class EstudianteXclaseModule {}
