import { Profesor } from "src/profesor/entities/profesor.entity"; 
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Entity,  PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity('domicilioProfesor')
export class DomicilioProfesor {

    @PrimaryGeneratedColumn()
    private idDomicilioProfesor : number;

    @Column()
    private  domicilio : string;

    @OneToOne(() => Ciudad, ciudad => ciudad.escuelas)
    @JoinColumn({name:"id_ciudad" })//nombre de la columna fk
    public ciudad : Ciudad;

    @ManyToOne(() => Profesor, profesor => profesor.domicilioProfesor)
    @JoinColumn({name:"id_Profesor" })
    public profesor : Profesor[];

    constructor (domicilio : string, ciudad : Ciudad, profesor : Profesor[] ) { 
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
        return this.ciudad; 
    }
    public setCiudad(ciudad: Ciudad): void {
        this.ciudad = ciudad; 
    }
    public getProfesor(): Profesor [] {
        return this.profesor; 
    }
    public setProfesor(profesor: Profesor []): void {
        this.profesor = profesor; 
    }

}

