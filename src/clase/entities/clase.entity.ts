import { Escuela } from "src/escuela/entities/escuela.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

export class Clase {

    @ManyToOne(() => Profesor, profesor  => profesor.clases)
    @JoinColum({name: "id_Profesor"}) // fk id profesor
    public profesor: Profesor;

    @ManyToOne(() => Escuela, escuela  => escuela.clases)
    @JoinColum({name: "id_escuela"}) // fk id escuela
    public escuela: Escuela;
}
