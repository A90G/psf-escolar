import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"profesor"})
export class Profesor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    apellidoNombre:string;

    @OneToMany(() => Clase, clases => clases.profesor)
    public clases: Clase[];


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
