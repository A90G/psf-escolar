import { DomicilioEstudiante } from "src/domicilio-estudiante/entities/domicilio-estudiante.entity";
import { Entity,  PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";


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

    constructor(apellidoNombre:string, fechaNacimiento: Date, domicilioEstudiantes: DomicilioEstudiante [] ){
        this.apellidoNombre = apellidoNombre;
        this.fechaNacimiento = fechaNacimiento;
        this.domicilioEstudiantes = domicilioEstudiantes;
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
}

