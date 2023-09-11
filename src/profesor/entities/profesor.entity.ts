import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"profesor"})
export class Profesor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    apellidoNombre:string;

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
