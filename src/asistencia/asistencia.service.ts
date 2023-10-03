import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';


@Injectable()
export class AsistenciaService {
  private asistencia :Asistencia[] = [];

  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository:Repository<Asistencia>
    ){}

    //'This action adds a new Asistencia';

    async create(createAsistenciaDto : CreateAsistenciaDto) : Promise<boolean>{ 
      try{
          let asistencia :Asistencia = await this.asistenciaRepository.save(new Asistencia(createAsistenciaDto.fecha, createAsistenciaDto.clases, createAsistenciaDto.estudiante,));
          if(asistencia)
             return true;
         else
             throw new Error('No se pudo crear asistencia');
      }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en asistencia create - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }

    // return `This action returns all Asistencia`
    async findAllRaw():Promise<CreateAsistenciaDto[]>{
  //     this.asistencia = [];
  //     let datos = await this.asistenciaRepository.query("select * from asistencia");

  //     datos.forEach(element => {
  //         let asistencia : CreateAsistenciaDto = new CreateAsistenciaDto[(element.fecha, element.clase, element.estudiante)];
  //         this.asistencia.push(asistencia)
  //     });

  //     return this.asistencia;
  // }
  try {
    const datos = await this.asistenciaRepository.query("select * from asistencia");
    const asistenciasDto: CreateAsistenciaDto[] = [];
  for (const element of datos) {
    const asistencia: CreateAsistenciaDto = {
      fecha: element.fecha,
      clases: element.clase,
      estudiante: element.estudiante,
    };
    asistenciasDto.push(asistencia);
  }

  return asistenciasDto;
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

  async findAllOrm():Promise<CreateAsistenciaDto[]>{
    return await this.asistenciaRepository.find();
}

//`This action returns a #${id} Asistencia`
async findById(claseId: number, estudianteId: number): Promise<CreateAsistenciaDto> {
    try {
      const criterio: FindOneOptions = {
        where: {
          clase: { idClase: claseId },
          estudiante: { id: estudianteId },
        },
      };
  
      const asistencia: CreateAsistenciaDto = await this.asistenciaRepository.findOne(criterio);
 
      if(asistencia)
          return asistencia
      else  
          throw new Error('No se encuentra asistencia');
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en asistencia find by estudiante - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

// `This action updates a #${id} asistencia`;

async update(
    createAsistenciaDto: CreateAsistenciaDto,
    claseId: number,
    estudianteId: number
  ): Promise<string> {
    try {
      const criterio: FindOneOptions = {
        where: { clase: { idClase: claseId }, estudiante: { id: estudianteId } },
      };
        let asistencia : Asistencia = await this.asistenciaRepository.findOne(criterio);
        if(!asistencia)
            throw new Error('no se pudo encontrar la asistencia a modificar ');
            let antiguaAsistencia = { 
                fecha: asistencia.getFecha(),  
                clase: asistencia.getClase(),
                estudiante: asistencia.getEstudiante()
            };
            if (createAsistenciaDto.fecha !== null && createAsistenciaDto.fecha !== undefined) {
                asistencia.setFecha(createAsistenciaDto.fecha);
              }       
              if (createAsistenciaDto.clases !== null && createAsistenciaDto.clases !== undefined) {
                asistencia.setClase(createAsistenciaDto.clases);
              } 
              if (createAsistenciaDto.estudiante !== null && createAsistenciaDto.estudiante !== undefined) {
                asistencia.setEstudiante(createAsistenciaDto.estudiante);
              } 

              asistencia = await this.asistenciaRepository.save(asistencia);
            return `OK - ${antiguaAsistencia.fecha} --> ${createAsistenciaDto.fecha} (${createAsistenciaDto.clases}), (${createAsistenciaDto.estudiante})`;
        }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en asistencia update - ' + error
        },HttpStatus.NOT_FOUND)
    }
}

// `This action removes a #${id} asistencia`;
async delete(claseId: number, estudianteId: number): Promise<any> {
    try {
      const criterio: FindOneOptions = {
        where: { clase: { idClase: claseId }, estudiante: { id: estudianteId } },
      };
  
      const asistencia: Asistencia = await this.asistenciaRepository.findOne(
        criterio
      );
  
      if (!asistencia) {
        throw new Error('No se pudo eliminar la asistencia');
      }
  
      await this.asistenciaRepository.remove(asistencia);
  
      return {
        message: 'Se eliminó exitosamente la asistencia',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en asistencia delete - ' + error,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }
}
