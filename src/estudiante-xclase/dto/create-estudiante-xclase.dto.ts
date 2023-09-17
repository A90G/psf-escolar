import { Clase } from "src/clase/entities/clase.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity"

export class CreateEstudianteXclaseDto {
    readonly clases: Clase[];
    readonly estudiante: Estudiante;
}