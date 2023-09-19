import { Profesor } from "src/profesor/entities/profesor.entity"; 
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Entity,  PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity('domicilioProfesor')
export class DomicilioProfesor {

    @PrimaryGeneratedColumn()
    private idDomicilioProfesor : number;

    @Column()
    private  domicilio : string;

    @ManyToOne(() => Ciudad, ciudad => ciudad.domicilioProfesor)
    @JoinColumn({name:"id_ciudad" })//el join se realiza en automático no es necesario renombrar la columna, salvo casos específicos
    public ciudad : Ciudad;

    @ManyToOne(() => Profesor, profesor => profesor.domicilioProfesores)
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
    public getDomicilio(): string {
        return this.domicilio; 
    }
    public setDomicilio(domicilio: string): void { 
        this.domicilio = domicilio; 
    }
    public getCiudad(): Ciudad {
        return this.ciudad; 
    }
    public setCiudad(ciudades: Ciudad): void {
        this.ciudad = ciudades; 
    }
    public getProfesor(): Profesor {
        return this.profesor; 
    }
    public setProfesor(profesor: Profesor): void {
        this.profesor = profesor; 
    }

}

