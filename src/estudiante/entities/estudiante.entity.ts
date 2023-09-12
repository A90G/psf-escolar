import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"estudiante"})
export class Estudiante{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    apellidoNombre:string;

    @Column()
    fechaNacimiento: Date;

    constructor(apellidoNombre:string, fechaNacimiento: Date ){
        this.apellidoNombre = apellidoNombre;
        this.fechaNacimiento = fechaNacimiento
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
    public getfechaNacimiento():Date{
        return this.fechaNacimiento;
    }
    public setfechaNacimiento(fechaNacimiento:Date){
        this.fechaNacimiento = fechaNacimiento;
    }
}

