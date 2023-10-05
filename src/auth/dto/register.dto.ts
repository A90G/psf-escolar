import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
    
    @IsString()
    @IsNotEmpty()
    readonly username:string;

    @IsString()
    @IsEmail()
    readonly email:string;

    @IsString()
    @MinLength(4)
    @MaxLength(12)
    readonly password:string;
}