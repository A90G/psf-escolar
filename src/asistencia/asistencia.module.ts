import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Asistencia } from './entities/asistencia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Asistencia, Clase, Estudiante])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
