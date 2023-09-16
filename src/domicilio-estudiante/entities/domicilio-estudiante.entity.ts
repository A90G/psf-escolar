import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Entity,  PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity('domicilioEstudiante')
export class DomicilioEstudiante {

    @PrimaryGeneratedColumn()
    private idDomicilioEstudiante : number;

    @Column()
    private  domicilio : string;

    @OneToOne(() => Ciudad, ciudad => ciudad.domicilioEstudiante)
    @JoinColumn({name:"id_ciudad" })//nombre de la columna fk
    public ciudad : Ciudad;

    @ManyToOne(() => Estudiante, estudiante => estudiante.domicilioEstudiantes)
    @JoinColumn({name:"id_Profesor" })
    public estudiante : Estudiante;

    constructor (domicilio : string, ciudad : Ciudad, estudiante : Estudiante) { 
        this.domicilio = domicilio;
        this.ciudad = ciudad;
        this.estudiante = estudiante;
    }

    public getIdDomicilioEstudiante(): number { 
        return this.idDomicilioEstudiante;
    }
    public setIdDomicilioEstudiante(idDomicilioEstudiante: number): void { 
        this.idDomicilioEstudiante = idDomicilioEstudiante; 
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
    public getEstudiante(): Estudiante {
        return this.estudiante; 
    }
    public setEstudiante(estudiante: Estudiante ): void {
        this.estudiante = estudiante; 
    }

}

