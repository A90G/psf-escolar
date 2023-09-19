import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Clase } from 'src/clase/entities/clase.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { DomicilioEstudiante } from 'src/domicilio-estudiante/entities/domicilio-estudiante.entity';
import { EstudianteXclase } from 'src/estudiante-xclase/entities/estudiante-xclase.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante, Asistencia, DomicilioEstudiante, EstudianteXclase])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
