import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {

  private profesores:Profesor[] = [];

    constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository:Repository<Profesor>
    ){}

    /*
    `This action returns all profesor`;
  */

    async findAllRaw():Promise<CreateProfesorDto[]>{
      try {
        const datos = await this.profesorRepository.query("select * from profesores");
        const  profesores : CreateProfesorDto[] = [];
      for (const element of datos) {
        const profesor: CreateProfesorDto = {
          apellidoNombre: element.apellidoNombre, 
          clases: element.clase, 
          domicilioProfesor: element.domicilioProfesor, 
        };
        profesores.push(profesor);
      }
    
      return profesores;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en findAllRaw - ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    }

/* 
     `This action returns a #${id} profesor`;
  }*/

  async findAllOrm():Promise<Profesor[]>{
    return await this.profesorRepository.find();
}

async findById(id :number) : Promise<CreateProfesorDto> {
  try{
      const criterio : FindOneOptions = { where: { id:id} };
      const profesor : Profesor  = await this.profesorRepository.findOne( criterio );
      if (profesor) {
        const createProfesorDto: CreateProfesorDto = {
          apellidoNombre: profesor.getapellidoNombre(),
          clases: profesor.getClase(),
          domicilioProfesor: profesor.getDomicilioProfesor(),
        };
        return createProfesorDto;
      } else {
        throw new Error('No se encuentra el profesor');
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en profesor find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

  /*
     'This action adds a new profesor';
  }*/

  async create(createProfesorDto : CreateProfesorDto) : Promise<boolean>{
    try{
        let profesor : Profesor = await this.profesorRepository.save(new Profesor(createProfesorDto.apellidoNombre, createProfesorDto.clases, createProfesorDto.domicilioProfesor));
        if(profesor)
           return true;
       else
           throw new Error('No se pudo crear el profesor');
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en profesor create - ' + error
        },HttpStatus.NOT_FOUND)
    }
}
  /*
     `This action updates a #${id} profesor`;
  }*/

  async update(createProfesorDto : CreateProfesorDto, id:number) : Promise<String>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let profesor : Profesor = await this.profesorRepository.findOne(criterio);
        if(!profesor) 
            throw new Error('no se pudo encontrar el profesor a modificar ');
        else{
            let antiguoProfesor = {
              apellidoNombre: profesor.getapellidoNombre(),
              clases: profesor.getClase(),
              domicilioProfesor: profesor.getDomicilioProfesor(),
            };
            if (createProfesorDto.apellidoNombre !== null && createProfesorDto.apellidoNombre !== undefined) {
              profesor.setapellidoNombre(createProfesorDto.apellidoNombre);
            }       
            if (createProfesorDto.clases !== null && createProfesorDto.clases !== undefined) {
              profesor.setClase(createProfesorDto.clases);
            } 
            if (createProfesorDto.domicilioProfesor !== null && createProfesorDto.domicilioProfesor !== undefined) {
              profesor.setDomicilioProfesor(createProfesorDto.domicilioProfesor);
            } 

            profesor.setapellidoNombre(createProfesorDto.apellidoNombre);
            profesor = await this.profesorRepository.save(profesor);
            return `OK - ${antiguoProfesor} --> ${createProfesorDto.apellidoNombre}, ${createProfesorDto.clases}, ${createProfesorDto.domicilioProfesor}`
        }
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en profesor update - ' + error
        },HttpStatus.NOT_FOUND)
    }
}

  /*
     `This action removes a #${id} profesor`;
  }*/
  async delete(id:number): Promise<any>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let profesor : Profesor = await this.profesorRepository.findOne(criterio);
        if(!profesor)
            throw new Error('no se eliminar profesor ');
        else{
            await this.profesorRepository.remove(profesor);
            return { id:id,
                    message:'se elimino exitosamente el profesor'
                }
            }
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en profesor delete - ' + error
        },HttpStatus.NOT_FOUND)
    }
    
}

}
