import { Clase } from "src/clase/entities/clase.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm"

@Entity({name:"asistencia"})
export class Asistencia {

    // @PrimaryGeneratedColumn() // luego se lo tenemos que sacar porque en realidad no lo lleva
    // id:number;

    @Column()
    fecha:Date;

    @ManyToMany(() => Clase, clases => clases.asistencia) // en el gráfico se observa una relación uno a muchos pero en clases decidimos ir por muchos a muchos
    @JoinColumn({name:"id_clase" })
    public clases: Clase[];

    @ManyToMany(() => Estudiante, estudiante => estudiante.asistencia)
    @JoinColumn({name:"id_estudiante" })
    public estudiante : Estudiante;

    constructor (fecha: Date, clase: Clase[], estudiante : Estudiante) { 
        this.fecha = fecha;
        this.clases = clase;
        this.estudiante = estudiante;
    }
    public getEstudiante(): Estudiante {
        return this.estudiante; 
    }
    public setEstudiante(estudiante: Estudiante ): void {
        this.estudiante = estudiante; 
    }
    public getFecha():Date{
        return this.fecha;
    }
    public setFecha(fecha:Date){
        this.fecha = fecha;
    }
    public getClase(): Clase [] {
        return this.clases; 
    }
    public setClase(clase: Clase []): void {
        this.clases = clase; 
    }

}
