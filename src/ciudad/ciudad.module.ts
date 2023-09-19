import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { DomicilioProfesor } from 'src/domicilio-profesor/entities/domicilio-profesor.entity';
import { DomicilioEstudiante } from 'src/domicilio-estudiante/entities/domicilio-estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Ciudad, Escuela, DomicilioProfesor, DomicilioEstudiante])],
  controllers: [CiudadController],
  providers: [CiudadService]
})
export class CiudadModule {}
