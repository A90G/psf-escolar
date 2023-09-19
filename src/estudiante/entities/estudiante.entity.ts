import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { DomicilioEstudiante } from "src/domicilio-estudiante/entities/domicilio-estudiante.entity";
import { EstudianteXclase } from "src/estudiante-xclase/entities/estudiante-xclase.entity";
import { Entity,  PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";


@Entity({name:"estudiante"})
export class Estudiante{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    apellidoNombre:string;

    @Column()
    fechaNacimiento: Date;

    @OneToMany(() => DomicilioEstudiante, domicilioEstudiantes => domicilioEstudiantes.estudiante)
    public domicilioEstudiantes : DomicilioEstudiante [];
    
    // @ManyToMany(() => Clase, clases => clases.estudiantes) // en el gráfico se observa una relación uno a muchos pero en clases decidimos ir por muchos a muchos
    // public clases: Clase[];

    @ManyToMany(() => Asistencia, asistencia => asistencia.estudiante) // en el gráfico se observa una relación uno a muchos pero en clases decidimos ir por muchos a muchos
    public asistencia: Asistencia[];

    @ManyToMany(() => EstudianteXclase, estudianteXclase => estudianteXclase.estudiante) // en el gráfico se observa una relación uno a muchos pero en clases decidimos ir por muchos a muchos
    public estudianteXclase:  EstudianteXclase [];

    constructor(apellidoNombre:string, fechaNacimiento: Date, domicilioEstudiantes: DomicilioEstudiante [], asistencia: Asistencia [], estudianteXclase: EstudianteXclase []){
        this.apellidoNombre = apellidoNombre;
        this.fechaNacimiento = fechaNacimiento;
        this.domicilioEstudiantes = domicilioEstudiantes;
        // this.clases = clases;
        this.asistencia = asistencia;
        this.estudianteXclase = estudianteXclase;
    }
    public getId():number{
        return this.id;
    }
    public getapellidoNombre():string{
        return this.apellidoNombre;
    }
    public setapellidoNombre(apellidoNombre:string){
        this.apellidoNombre = apellidoNombre;
    }
    public getfechaNacimiento():Date{
        return this.fechaNacimiento;
    }
    public setfechaNacimiento(fechaNacimiento:Date){
        this.fechaNacimiento = fechaNacimiento;
    }
    public getDomicilioEstudiantes():DomicilioEstudiante[]{
        return this.domicilioEstudiantes;
    }
    public setDomicilioEstudiantes(domicilioEstudiantes:DomicilioEstudiante[]){
        this.domicilioEstudiantes = domicilioEstudiantes;
    }
    // public getClase(): Clase [] {
    //     return this.clases; 
    // }
    // public setClase(clase: Clase []): void {
    //     this.clases = clase; 
    // }
    public getAsistencia(): Asistencia [] {
        return this.asistencia; 
    }
    public setAsistencia(asistencia: Asistencia []): void {
        this.asistencia = asistencia; 
    }
    public getEstudianteXclase(): EstudianteXclase [] {
        return this.estudianteXclase; 
    }
    public setEstudianteXclase(estudianteXclase: EstudianteXclase []): void {
        this.estudianteXclase = estudianteXclase; 
    }
}

