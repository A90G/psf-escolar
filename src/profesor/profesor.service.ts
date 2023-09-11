import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {

  private profesores:Profesor[] = [];

    constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository:Repository<Profesor>
    ){}

    /*
  findAll() {
    return `This action returns all profesor`;
  }*/

    async findAllRaw():Promise<Profesor[]>{
      this.profesores = [];
      let datos = await this.profesorRepository.query("select * from profesor");

      datos.forEach(element => {
          let profesor : Profesor = new Profesor(element['apellidoNombre']);
          this.profesores.push(profesor)
      });

      return this.profesores;
  }

/* 
  findOne(id: number) {
    return `This action returns a #${id} profesor`;
  }*/

  async findAllOrm():Promise<Profesor[]>{
    return await this.profesorRepository.find();
}

async findById(id :number) : Promise<Profesor> {
  try{
      const criterio : FindOneOptions = { where: { id:id} };
      const profesor : Profesor = await this.profesorRepository.findOne( criterio );
      if(profesor)
          return profesor
      else  
          throw new Error('No se encuentra el profesor');
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en profesor find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

  /*
  create(createProfesorDto: CreateProfesorDto) {
    return 'This action adds a new profesor';
  }*/

  async create(createProfesorDto : CreateProfesorDto) : Promise<boolean>{
    try{
        let profesor : Profesor = await this.profesorRepository.save(new Profesor(createProfesorDto.apellidoNombre));
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
  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }*/

  async update(createProfesorDto : CreateProfesorDto, id:number) : Promise<String>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let profesor : Profesor = await this.profesorRepository.findOne(criterio);
        if(profesor) // aquií llevaba ! y se lo saqué ver si queda biensin 
            throw new Error('no se pudo encontrar el profesro a modificar ');
        else{
            let antiguoProfesor = profesor.getapellidoNombre();
            profesor.setapellidoNombre(createProfesorDto.apellidoNombre);
            profesor = await this.profesorRepository.save(profesor);
            return `OK - ${antiguoProfesor} --> ${createProfesorDto.apellidoNombre}`
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
  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }*/
  async delete(id:number): Promise<any>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let profesor : Profesor = await this.profesorRepository.findOne(criterio);
        if(profesor)// aquií llevaba ! y se lo saqué ver si queda biensin 
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
