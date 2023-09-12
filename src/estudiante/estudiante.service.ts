import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
//import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudianteService {

  private estudiantes:Estudiante[] = [];

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository:Repository<Estudiante>
    ){}

    //'This action adds a new estudiante';

    async create(createEstudianteDto : CreateEstudianteDto) : Promise<boolean>{
      try{
          let estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(createEstudianteDto.apellidoNombre, createEstudianteDto.fechaNacimiento));
          if(estudiante)
             return true;
         else
             throw new Error('No se pudo crear el Estudiante');
      }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en Estudiante create - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }

    // return `This action returns all estudiante`
    async findAllRaw():Promise<Estudiante[]>{
      this.estudiantes = [];
      let datos = await this.estudianteRepository.query("select * from estudiante");

      datos.forEach(element => {
          let estudiante : Estudiante = new Estudiante(element.apellidoNombre, element.fechaNacimiento);
          this.estudiantes.push(estudiante)
      });

      return this.estudiantes;
  }

  async findAllOrm():Promise<Estudiante[]>{
    return await this.estudianteRepository.find();
}

//`This action returns a #${id} estudiante`

async findById(id :number) : Promise<Estudiante> {
  try{
      const criterio : FindOneOptions = { where: { id:id} };
      const estudiante : Estudiante = await this.estudianteRepository.findOne( criterio );
      if(estudiante)
          return estudiante
      else  
          throw new Error('No se encuentra el estudiante');
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en estudiante find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

// `This action updates a #${id} estudiante`;

  async update(createEstudianteDto : CreateEstudianteDto, id:number) : Promise<String>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
        if(estudiante)
            throw new Error('no se pudo encontrar el estudiante a modificar ');
        else{
            let antiguoEstudiante = { 
                apellidoNombre: estudiante.getapellidoNombre(),    
            };
            estudiante.setapellidoNombre(createEstudianteDto.apellidoNombre); 
            estudiante.setfechaNacimiento(createEstudianteDto.fechaNacimiento);
            // acá va un &&?? o cómo me aseguro que ambas condiciones se cumplen para update estudiante? porque en ningún lugar yo le puse que eran not null por ejemplo, mismo para el create o el delete

            estudiante = await this.estudianteRepository.save(estudiante);
            return `OK - ${antiguoEstudiante.apellidoNombre} --> ${createEstudianteDto.apellidoNombre} (${createEstudianteDto.fechaNacimiento})`;
        }
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en estudiante update - ' + error
        },HttpStatus.NOT_FOUND)
    }
}

// `This action removes a #${id} estudiante`;
async delete(id:number): Promise<any>{
  try{
      const criterio : FindOneOptions = { where : {id:id} }
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
      if(estudiante)// aquií llevaba ! y se lo saqué ver si queda biensin 
          throw new Error('no se pudo eliminar estudiante ');
      else{
          await this.estudianteRepository.remove(estudiante);
          return { id:id,
                  message:'se elimino exitosamente el estudiante'
              }
          }
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en estudiante delete - ' + error
      },HttpStatus.NOT_FOUND)
  }
  
}
}
