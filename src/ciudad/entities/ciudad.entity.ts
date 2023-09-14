import { DomicilioProfesor } from "src/domicilio-profesor/entities/domicilio-profesor.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";


@Entity({name:"ciudad"})
export class Ciudad{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @OneToMany(() => Escuela, escuela => escuela.ciudad)
    //@JoinColumn()
    public escuelas : Escuela[];

    @OneToMany(() => DomicilioProfesor, domicilioProfesor => domicilioProfesor.ciudad)
    //@JoinColumn({name:"id_DomicilioProfesor" })//nombre de la columna fk
    public domicilioProfesor : DomicilioProfesor [];

    //falta relación domicilio estudiante y agregarla al dto

    constructor(nombre:string){
        this.nombre = nombre
    }
    public getId():number{
        return this.id;
    }
    public getNombre():string{
        return this.nombre;
    }
    public setNombre(nombre:string){
        this.nombre = nombre;
    }
    public getEscuela(): Escuela []{
        return this.escuelas; 
    }
    public setEscuela(escuelas: Escuela[]): void {
        this.escuelas = escuelas; 
    }
    public getDomicilioProfesor(): DomicilioProfesor [] {
        return this.domicilioProfesor; 
    }
    public setDomicilioProfesor(domicilioProfesor: DomicilioProfesor []): void { 
        this.domicilioProfesor = domicilioProfesor; 
    }

}
