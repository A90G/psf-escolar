import { Clase } from "src/clase/entities/clase.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Entity } from "typeorm";
import { ManyToMany, JoinColumn } from "typeorm"
@Entity({name:"EstudianteXclase"})
export class EstudianteXclase {
    //prueba 1 sin id
    @ManyToMany(() => Clase, clases => clases.estudianteXclase) 
    @JoinColumn({name:"id_clase" })
    public clases: Clase[];

    @ManyToMany(() => Estudiante, estudiante => estudiante.estudianteXclase)
    @JoinColumn({name:"id_estudiante" })
    public estudiante : Estudiante;

    constructor (clase: Clase[], estudiante : Estudiante) { 
        this.clases = clase;
        this.estudiante = estudiante;
    }
    public getEstudiante(): Estudiante {
        return this.estudiante; 
    }
    public setEstudiante(estudiante: Estudiante ): void {
        this.estudiante = estudiante; 
    }
    public getClase(): Clase [] {
        return this.clases; 
    }
    public setClase(clase: Clase []): void {
        this.clases = clase; 
    }
}
