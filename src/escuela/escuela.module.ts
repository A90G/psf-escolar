import { Module } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { Escuela } from './entities/escuela.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Clase } from 'src/clase/entities/clase.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Escuela, Ciudad, Clase])], // acá clase no lleva el arreglo?
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}
