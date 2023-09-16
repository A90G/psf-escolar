import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, OneToMany } from "typeorm"

@Entity({name:"asistencia"})
export class Asistencia {

    @PrimaryGeneratedColumn() // luego se lo tenemos que sacar porque en realidad no lo lleva
    id:number;

    @Column()
    fecha:Date;

}
