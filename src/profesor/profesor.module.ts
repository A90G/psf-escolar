import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { Profesor } from './entities/profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { DomicilioProfesor } from 'src/domicilio-profesor/entities/domicilio-profesor.entity';



@Module({
  imports:[TypeOrmModule.forFeature([Profesor, Clase, DomicilioProfesor])],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
