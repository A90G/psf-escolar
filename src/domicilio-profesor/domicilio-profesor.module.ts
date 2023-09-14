import { Module } from '@nestjs/common';
import { DomicilioProfesorService } from './domicilio-profesor.service';
import { DomicilioProfesorController } from './domicilio-profesor.controller';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([DomicilioProfesorController, Ciudad, Profesor])],
  controllers: [DomicilioProfesorController],
  providers: [DomicilioProfesorService],
})
export class DomicilioProfesorModule {}
