import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";

export class CreateDomicilioEstudianteDto {
    readonly domicilio : string;
    readonly ciudad: Ciudad;
    readonly estudiante : Estudiante;

}
