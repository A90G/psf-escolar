import { DomicilioProfesor } from "src/domicilio-profesor/entities/domicilio-profesor.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";

export class CiudadDTO{
    readonly nombre : string;
    readonly escuela : Escuela;
    readonly domicilioProfesor : DomicilioProfesor;
}