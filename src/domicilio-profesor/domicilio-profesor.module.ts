import { Module } from '@nestjs/common';
import { DomicilioProfesorService } from './domicilio-profesor.service';
import { DomicilioProfesorController } from './domicilio-profesor.controller';

@Module({
  controllers: [DomicilioProfesorController],
  providers: [DomicilioProfesorService],
})
export class DomicilioProfesorModule {}
