import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfesorModule } from './profesor/profesor.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomicilioProfesorModule } from './domicilio-profesor/domicilio-profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ClaseModule } from './clase/clase.module';
import { DomicilioEstudianteModule } from './domicilio-estudiante/domicilio-estudiante.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { EstudianteXclaseModule } from './estudiante-xclase/estudiante-xclase.module';
import { AsistenciaModule } from './asistencia/asistencia.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type":"mysql",
    "host": "localhost",
    "port": 3306,
    "username":"root",
    "password":"desarrollador",
    "database":"db_psf",
    "entities": [__dirname + "/**/**/**.entity{.ts,.js}"],
    "synchronize": true //modo desarrollador.

  }),    
    ProfesorModule, 
    CiudadModule, DomicilioProfesorModule, EscuelaModule, ClaseModule, DomicilioEstudianteModule, EstudianteModule, EstudianteXclaseModule, AsistenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
