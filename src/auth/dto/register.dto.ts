import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends PartialType (LoginDto) {
    
    @IsString()
    @IsNotEmpty()
    readonly username:string;

    // @IsString()
    // @IsEmail()
    // readonly email:string;

    // @IsString()
    // @MinLength(4)
    // @MaxLength(12)
    // readonly password:string;
}