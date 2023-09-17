import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

export class CreateClaseDto {

    readonly nombre : string;
    readonly profesor : Profesor;
    readonly escuela : Escuela;
    readonly estudiantes : Estudiante;
    readonly asistencia: Asistencia;
}
