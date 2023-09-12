import { Ciudad } from "src/ciudad/entities/ciudad.entity";

export class CreateEscuelaDto {
    readonly nombre : string;
    readonly domicilio : string;
    readonly ciudad : Ciudad;
}
