import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudianteService {

  private estudiantes:Estudiante[] = [];

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository:Repository<Estudiante>
    ){}

    //'This action adds a new estudiante';

    async create(createEstudianteDto : CreateEstudianteDto) : Promise<boolean>{ //yo puse apellido fecha todo junto como lo indicaba el gráfico pero el profesor separó estas variantes en nombre por un lado y fecha por el otro   
      try{
          let estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(createEstudianteDto.apellidoNombre, createEstudianteDto.fechaNacimiento, createEstudianteDto.domicilioEstudiante, createEstudianteDto.asistencia, createEstudianteDto.estudianteXclase ));
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
    
async findAllRaw():Promise<CreateEstudianteDto[]>{
  try {
    const datos = await this.estudianteRepository.query("select * from estudiante");
    const  estudiantes : CreateEstudianteDto[] = [];
  for (const element of datos) {
    const estudiante: CreateEstudianteDto = {
      apellidoNombre: element.apellidoNombre, 
      fechaNacimiento: element.fechaNacimiento,
      domicilioEstudiante: element.domicilioEstudiante,
      asistencia: element.asistencia,
      estudianteXclase: element.estudianteXclase,
    };
    estudiantes.push(estudiante);
  }

  return estudiantes;
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

async findAllOrm():Promise<Estudiante[]>{
    return await this.estudianteRepository.find();
}

//`This action returns a #${id} estudiante`

async findById(id :number) : Promise<CreateEstudianteDto> {
  try{
    const criterio : FindOneOptions = { where: { id:id} };
    const estudiante : Estudiante  = await this.estudianteRepository.findOne( criterio );
    if (estudiante) {
      const createEstudianteDto: CreateEstudianteDto = {
        apellidoNombre: estudiante.getapellidoNombre(), 
        fechaNacimiento: estudiante.getfechaNacimiento(),
        domicilioEstudiante: estudiante.getDomicilioEstudiantes(),
        asistencia: estudiante.getAsistencia(),
        estudianteXclase: estudiante.getEstudianteXclase(),
      };
      return createEstudianteDto;
    } else {
      throw new Error('No se encuentra el estudiante');
    }
  }catch(error){
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
        if(!estudiante)
            throw new Error('no se pudo encontrar el estudiante a modificar ');
            let antiguoEstudiante = { 
                apellidoNombre: estudiante.getapellidoNombre(), 
                fechaNacimiento: estudiante.getfechaNacimiento(),
                domicilioEstudiante: estudiante.getDomicilioEstudiantes(),
                asistencia: estudiante.getAsistencia(),
                estudianteXclase: estudiante.getEstudianteXclase(),
            };
            if (createEstudianteDto.apellidoNombre !== null && createEstudianteDto.apellidoNombre !== undefined) {
                estudiante.setapellidoNombre(createEstudianteDto.apellidoNombre);
              }       
              if (createEstudianteDto.fechaNacimiento !== null && createEstudianteDto.fechaNacimiento !== undefined) {
                estudiante.setfechaNacimiento(createEstudianteDto.fechaNacimiento);
              } 
              if (createEstudianteDto.domicilioEstudiante !== null && createEstudianteDto.domicilioEstudiante !== undefined) {
                estudiante.setDomicilioEstudiantes(createEstudianteDto.domicilioEstudiante);
              }       
              if (createEstudianteDto.asistencia !== null && createEstudianteDto.asistencia !== undefined) {
                estudiante.setAsistencia(createEstudianteDto.asistencia);
              }       
              if (createEstudianteDto.estudianteXclase !== null && createEstudianteDto.estudianteXclase !== undefined) {
                estudiante.setEstudianteXclase(createEstudianteDto.estudianteXclase);
              }       
              
            estudiante = await this.estudianteRepository.save(estudiante);
            return `OK - ${antiguoEstudiante.apellidoNombre} --> ${createEstudianteDto.apellidoNombre} (${createEstudianteDto.fechaNacimiento}), (${createEstudianteDto.domicilioEstudiante}),  (${createEstudianteDto.asistencia}),(${createEstudianteDto.estudianteXclase}),`;
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
      if(!estudiante)
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
