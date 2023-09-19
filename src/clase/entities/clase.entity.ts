import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { EstudianteXclase } from "src/estudiante-xclase/entities/estudiante-xclase.entity";
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

    // @ManyToMany (()=> Estudiante, estudiantes => estudiantes.clases)
    // @JoinColumn({name: "id_estudiante"}) // fk id estudiante
    // public estudiantes: Estudiante;

    @ManyToMany(() => Asistencia, asistencia => asistencia.clases) // en el gráfico se observa una relación uno a muchos pero en clases decidimos ir por muchos a muchos
    @JoinColumn({name:"id_asistencia" })
    public asistencia: Asistencia [];

    @ManyToMany(() => EstudianteXclase, estudianteXclase => estudianteXclase.clases) 
    @JoinColumn({name:"id_estudianteXclase" })
    public estudianteXclase: EstudianteXclase[];

    constructor (nombre : string, profesor: Profesor, escuela: Escuela,  asistencia: Asistencia [], estudianteXclase: EstudianteXclase[]) { 
        this.nombre = nombre;
        this.profesor = profesor;
        this.escuela = escuela;
        // this.estudiantes = estudiantes;
        this.asistencia = asistencia;
        this.estudianteXclase = estudianteXclase;
    }

    public getIdClase(): number { 
        return this.idClase;
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
    // public getEstudiante(): Estudiante{
    //     return this.estudiantes; 
    // }
    // public setEstudiante(estudiantes: Estudiante): void {
    //     this.estudiantes = estudiantes; 
    // }
    public getEstudianteXClase(): EstudianteXclase []{
        return this.estudianteXclase; 
    }
    public setEstudianteXClase(estudianteXclase: EstudianteXclase []): void {
        this.estudianteXclase = estudianteXclase; 
    }
    public getAsistencia(): Asistencia []{
        return this.asistencia; 
    }
    public setAsistencia(asistencia: Asistencia[]): void {
        this.asistencia = asistencia; 
    }
}
