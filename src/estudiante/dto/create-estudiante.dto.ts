import { Asistencia } from "src/asistencia/entities/asistencia.entity";
// import { Clase } from "src/clase/entities/clase.entity";
import { DomicilioEstudiante } from "src/domicilio-estudiante/entities/domicilio-estudiante.entity";
import { EstudianteXclase } from "src/estudiante-xclase/entities/estudiante-xclase.entity";

export class CreateEstudianteDto {
    readonly apellidoNombre : string;
    readonly fechaNacimiento: Date;
    readonly domicilioEstudiante: DomicilioEstudiante[];
    // readonly clases: Clase[];
    readonly asistencia: Asistencia [];
    readonly estudianteXclase: EstudianteXclase [];
}
