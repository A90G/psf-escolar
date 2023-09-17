import { Clase } from "src/clase/entities/clase.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity"

export class CreateAsistenciaDto {

    readonly fecha: Date;
    readonly clases: Clase;
    readonly estudiante: Estudiante;
}
