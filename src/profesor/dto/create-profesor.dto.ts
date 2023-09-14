import { Clase } from "src/clase/entities/clase.entity";
import { DomicilioProfesor } from "src/domicilio-profesor/entities/domicilio-profesor.entity";

export class CreateProfesorDto {
    readonly apellidoNombre : string;
    readonly clases: Clase[];
    readonly domicilioProfesor : DomicilioProfesor;
}
