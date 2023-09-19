import { Module } from '@nestjs/common';
import { EstudianteXclaseService } from './estudiante-xclase.service';
import { EstudianteXclaseController } from './estudiante-xclase.controller';
import { EstudianteXclase } from './entities/estudiante-xclase.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([EstudianteXclase, Clase, Estudiante])],
  controllers: [EstudianteXclaseController],
  providers: [EstudianteXclaseService],
})
export class EstudianteXclaseModule {}
