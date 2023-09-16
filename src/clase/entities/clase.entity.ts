import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import {  Entity,  PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne } from "typeorm";

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

    @ManyToMany (()=> Estudiante, estudiantes => estudiantes.clases)
    @JoinColumn({name: "id_estudiante"}) // fk id estudiante
    public estudiantes: Estudiante;

    //falta relación estudiantes con clase y agregarlo al dto

    constructor (nombre : string, profesor: Profesor, escuela: Escuela, estudiantes: Estudiante) { 
        // this.idClase = id;
        this.nombre = nombre;
        this.profesor = profesor;
        this.escuela = escuela;
        this.estudiantes = estudiantes;
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
    public getEstudiante(): Estudiante{
        return this.estudiantes; 
    }
    public setEstudiante(estudiantes: Estudiante): void {
        this.estudiantes = estudiantes; 
    }
}
