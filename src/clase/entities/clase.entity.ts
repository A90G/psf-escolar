import { Escuela } from "src/escuela/entities/escuela.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import {  Entity,  PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity('clases')
export class Clase {

    @PrimaryGeneratedColumn()
    private idClase : number;

    @Column()
    private nombre : string;

    @ManyToOne(() => Profesor, profesor  => profesor.clases)
    @JoinColumn({name: "id_Profesor"}) // fk id profesor
    public profesor: Profesor;

    @ManyToOne(() => Escuela, escuela  => escuela.clases)
    @JoinColumn({name: "id_escuela"}) // fk id escuela
    public escuela: Escuela;

    constructor (nombre : string, profesor: Profesor, escuela: Escuela) { 
        // this.idClase = id;
        this.nombre = nombre;
        this.profesor = profesor;
        this.escuela = escuela
       // soluciona este problema con el create del service

    }

    public getIdClase(): number { 
        return this.idClase;
    }
    public setIdClase(idClase: number): void { 
        this.idClase = idClase; 
    }
    public getNombre(): string {
        return this.nombre; 
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre; 
    }
    public getProfesor(): Profesor {
        return this.profesor; 
    }
    public setProfesor(profesor: Profesor): void { 
        this.profesor = profesor; 
    }
    public getEscuela(): Escuela{
        return this.escuela; 
    }
    public setEscuela(escuela: Escuela): void {
        this.escuela = escuela; 
    }
}
