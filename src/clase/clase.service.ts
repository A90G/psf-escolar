import { CreateClaseDto } from './dto/create-clase.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { Clase } from './entities/clase.entity';

@Injectable()
export class ClaseService {

  private clases:Clase[] = [];

  constructor(
    @InjectRepository(Clase)
    private readonly clasesRepository:Repository<Clase>
    ){}

    //'This action adds a new class';

    async create(createClaseDto : CreateClaseDto) : Promise<boolean>{
      try{
          let clase:Clase = await this.clasesRepository.save(new Clase(createClaseDto.nombre, createClaseDto.profesor, createClaseDto.escuela));
          if(clase)
             return true;
         else
             throw new Error('No se pudo crear la nueva clase');
      }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en Clase create - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }

    // return `This action returns all classes`
    async findAllRaw():Promise<Clase[]>{
      this.clases = [];
      let datos = await this.clasesRepository.query("select * from clases");

      datos.forEach(element => {
          let clase : Clase = new Clase[(element.nombre, element.profesor, element.escuela)]; // será solución así? ver create
          this.clases.push(clase)
      });

      return this.clases;
  }

  async findAllOrm():Promise<Clase[]>{
    return await this.clasesRepository.find();
}

//`This action returns a #${id} clase`

async findById(id :number) : Promise<Clase> {
  try{
      const criterio : FindOneOptions = { where: { id:id} };
      const clase : Clase = await this.clasesRepository.findOne( criterio );
      if(clase)
          return clase
      else  
          throw new Error('No se encuentra la clase');
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en clase find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

// `This action updates a #${id} class`;

  async update(createClaseDto : CreateClaseDto, id:number) : Promise<string>{
    try{
        const criterio : FindOneOptions = { where : {id:id} };
        let clase : Clase = await this.clasesRepository.findOne(criterio);
        if(clase)
            throw new Error('no se pudo encontrar la clase a modificar ');
            const antiguaClase = {
              nombre: clase.getNombre(),
              profesor: clase.getProfesor(),
              escuela: clase.getEscuela(),
            };
        
            if (createClaseDto.nombre !== null && createClaseDto.nombre !== undefined) {
              clase.setNombre(createClaseDto.nombre);
            } 
            // else {
            //   throw new Error('El dato "nombre" de la clase no puede ser null o undefined');
            // }
        
            if (createClaseDto.profesor !== null && createClaseDto.profesor !== undefined) {
              clase.setProfesor(createClaseDto.profesor);
            } 
            // else {
            //   throw new Error('El dato "profesor" de la clase no puede ser null o undefined');
            // }
        
            if (createClaseDto.escuela !== null && createClaseDto.escuela !== undefined) {
              clase.setEscuela(createClaseDto.escuela);
            } else {
              throw new Error('El dato "escuela" de la clase no puede ser null o undefined');
            }
        
            clase = await this.clasesRepository.save(clase);
            return `OK - ${antiguaClase.nombre} --> ${createClaseDto.nombre} (${createClaseDto.profesor}) (${createClaseDto.escuela})`;
        }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en clase update - ' + error
        },HttpStatus.NOT_FOUND)
    }
}

// `This action removes a #${id} clase`;
async delete(id:number): Promise<any>{
  try{
      const criterio : FindOneOptions = { where : {id:id} }
      let clase : Clase = await this.clasesRepository.findOne(criterio);
      if(clase)// aquií llevaba ! y se lo saqué ver si queda biensin 
          throw new Error('no se pudo eliminar la clase ');
      else{
          await this.clasesRepository.remove(clase);
          return { id:id,
                  message:'se elimino exitosamente la clase'
              }
          }
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en clase delete - ' + error
      },HttpStatus.NOT_FOUND)
  }
  
}
}

