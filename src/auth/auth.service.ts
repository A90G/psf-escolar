import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service'; 
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/user/entities/user.entity'; 
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private userServise:UserService,
              private jwtService:JwtService
              ){}

async register(registerDto:RegisterDto){
    const user = await this.userServise.findOneByEmail(registerDto.email)

  if(user){
    throw new BadRequestException('El usuario ya existe')
  }
  const pass_encryptada = await bcrypt.hash(registerDto.password,10)
  return await this.userServise.create(new User(registerDto.email,pass_encryptada,registerDto.username)) // acá una variante es usar el user module. create?
}

async login({email,password}:LoginDto){
  //buscar el usuario ingresado
  const user = await this.userServise.findOneByEmail(email);
  //compruebo si el usuario existe
  if(!user)
    throw new UnauthorizedException('usuario incorrecto');

  //compara el password del usuario existente con el ingresado por el cliente
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(!isPasswordValid)
    throw new UnauthorizedException('password incorrecto');
  
  const payload = {email: user.email}

  //creo el token
  const token = await this.jwtService.signAsync(payload);

  return token;

}



}