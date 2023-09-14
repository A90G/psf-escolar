import { DomicilioEstudiante } from "src/domicilio-estudiante/entities/domicilio-estudiante.entity";

export class CreateEstudianteDto {
    readonly apellidoNombre : string;
    readonly fechaNacimiento: Date;
    readonly domicilioEstudiante: DomicilioEstudiante[];
}
