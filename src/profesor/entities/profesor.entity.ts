import { Clase } from "src/clase/entities/clase.entity";
import { DomicilioProfesor } from "src/domicilio-profesor/entities/domicilio-profesor.entity";
import { Column, Entity, OneToMany, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';

@Entity({name:"profesor"})
export class Profesor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    apellidoNombre:string;

    @OneToMany(() => Clase, clases => clases.profesor)
    public clases: Clase[];

    @OneToMany(() => DomicilioProfesor, domicilioProfesor => domicilioProfesor.profesor)
    @JoinColumn({name:"id_domicilioProfesor" })
    public domicilioProfesor : DomicilioProfesor;


    constructor(apellidoNombre:string){
        this.apellidoNombre = apellidoNombre
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
}
