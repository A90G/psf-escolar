import { Module } from '@nestjs/common';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';
import { DomicilioEstudianteController } from './domicilio-estudiante.controller';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { DomicilioEstudiante } from './entities/domicilio-estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DomicilioEstudiante, Ciudad, Estudiante])],
  controllers: [DomicilioEstudianteController],
  providers: [DomicilioEstudianteService],
})
export class DomicilioEstudianteModule {}
