import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Clase } from './entities/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { EstudianteXclase } from 'src/estudiante-xclase/entities/estudiante-xclase.entity';
//import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Clase, Profesor, Escuela, Asistencia, EstudianteXclase])],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
