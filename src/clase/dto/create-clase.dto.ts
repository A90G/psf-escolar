import { Escuela } from "src/escuela/entities/escuela.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

export class CreateClaseDto {

    readonly nombre : string;
    readonly profesor : Profesor;
    readonly escuela : Escuela;
}
