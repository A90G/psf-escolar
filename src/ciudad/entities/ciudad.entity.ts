import { DomicilioEstudiante } from "src/domicilio-estudiante/entities/domicilio-estudiante.entity";
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
    public escuelas : Escuela[];

    @OneToMany(() => DomicilioProfesor, domicilioProfesor => domicilioProfesor.ciudad)
    public domicilioProfesor : DomicilioProfesor [];

    @OneToOne(() => DomicilioEstudiante, domicilioEstudiante => domicilioEstudiante.ciudad)
    public domicilioEstudiante : DomicilioEstudiante; //suponemos que en cada ciudad puede haber un único domicilio de estudiante

    constructor(nombre:string, escuela: Escuela[], domicilioProfesor:DomicilioProfesor[], domicilioEstudiante: DomicilioEstudiante){
        this.nombre = nombre;
        this.escuelas = escuela;
        this.domicilioProfesor = domicilioProfesor;
        this.domicilioEstudiante = domicilioEstudiante;
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
    public getDomicilioEstudiante(): DomicilioEstudiante { 
        return this.domicilioEstudiante;
    }
    public setDomicilioEstudiante(domicilioEstudiante: DomicilioEstudiante): void { 
        this.domicilioEstudiante= domicilioEstudiante; 
    }
}
