import { Clase } from "src/clase/entities/clase.entity";
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Entity,  PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('escuelas')
export class Escuela {

    @PrimaryGeneratedColumn()
    private idEscuela : number;

    @Column()
    private    nombre : string;

    @Column()
    private    domicilio : string;

    @ManyToOne(() => Ciudad, ciudad => ciudad.escuela)
    @JoinColumn({name:"id_ciudad" })
    public ciudad : Ciudad;

    @OneToMany(() => Clase, clases => clases.escuela)
     public clases : Clase[];

    constructor (nombre : string, domicilio : string, ciudad : Ciudad, clases: Clase[] ) { 
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.ciudad = ciudad;
        this.clases = clases;
    }

    public getIdEscuela(): number { 
        return this.idEscuela;
    }
    public getNombre(): string {
        return this.nombre; 
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre; 
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
    public getClase(): Clase [] {
        return this.clases; 
    }
    public setClase(clase: Clase []): void {
        this.clases = clase; 
    }

}

