import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";


export class CreateDomicilioProfesorDto {

    readonly domicilio : string;
    readonly ciudad: Ciudad;
    readonly profesor : Profesor;
}
