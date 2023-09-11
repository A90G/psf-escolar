import { Module } from '@nestjs/common';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';
import { DomicilioEstudianteController } from './domicilio-estudiante.controller';

@Module({
  controllers: [DomicilioEstudianteController],
  providers: [DomicilioEstudianteService],
})
export class DomicilioEstudianteModule {}
