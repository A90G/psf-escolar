import { Clase } from "src/clase/entities/clase.entity";
import { DomicilioEstudiante } from "src/domicilio-estudiante/entities/domicilio-estudiante.entity";
import { Entity,  PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, OneToMany } from "typeorm";


@Entity({name:"estudiante"})
export class Estudiante{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    apellidoNombre:string;

    @Column()
    fechaNacimiento: Date;

    @OneToMany(() => DomicilioEstudiante, domicilioEstudiantes => domicilioEstudiantes.estudiante)
   // @JoinColumn({name:"id_domicilioEstudiante" })
    public domicilioEstudiantes : DomicilioEstudiante [];
    
    @ManyToMany(() => Clase, clases => clases.estudiantes) // en el gráfico se observa una relación uno a muchos pero en clases decidimos ir por muchos a muchos
    public clases: Clase[];

    constructor(apellidoNombre:string, fechaNacimiento: Date, domicilioEstudiantes: DomicilioEstudiante [], clases: Clase []){
        this.apellidoNombre = apellidoNombre;
        this.fechaNacimiento = fechaNacimiento;
        this.domicilioEstudiantes = domicilioEstudiantes;
        this.clases = clases;
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
    public getClase(): Clase [] {
        return this.clases; 
    }
    public setClase(clase: Clase []): void {
        this.clases = clase; 
    }
}

