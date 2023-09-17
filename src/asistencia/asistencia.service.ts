import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
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
    async findAllRaw():Promise<Asistencia[]>{
      this.asistencia = [];
      let datos = await this.asistenciaRepository.query("select * from asistencia");

      datos.forEach(element => {
          let asistencia : Asistencia = new Asistencia(element.fecha, element.clase, element.estudiante);
          this.asistencia.push(asistencia)
      });

      return this.asistencia;
  }

  async findAllOrm():Promise<Asistencia[]>{
    return await this.asistenciaRepository.find();
}

//`This action returns a #${id} Asistencia`

async findById(id :number) : Promise<Asistencia> {
  try{
      const criterio : FindOneOptions = { where: { estudiante:Estudiante} };
      const asistencia : Asistencia = await this.asistenciaRepository.findOne( criterio );
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

  async update(createAsistenciaDto : CreateAsistenciaDto, estudiante:Estudiante) : Promise<String>{
    try{
        const criterio : FindOneOptions = { where : {estudiante:Estudiante} }
        let asistencia : Asistencia = await this.asistenciaRepository.findOne(criterio);
        if(asistencia)
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
async delete(id:number): Promise<any>{
  try{
      const criterio : FindOneOptions = { where : {id:id} }
      let asistencia : Asistencia = await this.asistenciaRepository.findOne(criterio);
      if(asistencia)// aquií llevaba ! y se lo saqué ver si queda biensin 
          throw new Error('no se pudo eliminar asistencia ');
      else{
          await this.asistenciaRepository.remove(asistencia);
          return { id:id,
                  message:'se elimino exitosamente el asistencia'
              }
          }
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en asistencia delete - ' + error
      },HttpStatus.NOT_FOUND)
  }
  
}
}
