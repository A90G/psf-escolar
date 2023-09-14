import { Profesor } from "src/profesor/entities/profesor.entity"; 
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Entity,  PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('domicilioProfesor')
export class DomicilioProfesor {

    @PrimaryGeneratedColumn()
    private idDomicilioProfesor : number;

    @Column()
    private  domicilio : string;

    @ManyToOne(() => Ciudad, ciudad => ciudad.domicilioProfesor)
    @JoinColumn({name:"id_ciudad" })//nombre de la columna fk
    public ciudad : Ciudad;
    //@OneToOne(() => Ciudad, ciudad => ciudad.domicilioProfesor)
    //@JoinColumn({name:"id_ciudad" })//nombre de la columna fk
    //public ciudad : Ciudad;

    @ManyToOne(() => Profesor, profesor => profesor.domicilioProfesor)
    @JoinColumn({name:"id_Profesor" })
    public profesor : Profesor;

    constructor (domicilio : string, ciudad : Ciudad, profesor : Profesor ) { 
        this.domicilio = domicilio;
        this.ciudad = ciudad;
        this.profesor = profesor;
    }

    public getIdDomicilioProfesor(): number { 
        return this.idDomicilioProfesor;
    }
    public setIdDomicilioProfesor(idDomicilioProfesor: number): void { 
        this.idDomicilioProfesor = idDomicilioProfesor; 
    }
    public getDomicilio(): string {
        return this.domicilio; 
    }
    public setDomicilio(domicilio: string): void { 
        this.domicilio = domicilio; 
    }
    public getCiudad(): Ciudad {
        return this.ciudades; 
    }
    public setCiudad(ciudades: Ciudad): void {
        this.ciudades = ciudades; 
    }
    public getProfesor(): Profesor {
        return this.profesor; 
    }
    public setProfesor(profesor: Profesor): void {
        this.profesor = profesor; 
    }

}

