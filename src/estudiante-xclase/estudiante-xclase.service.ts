import { CreateEstudianteXclaseDto } from './dto/create-estudiante-xclase.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Repository , FindOneOptions } from 'typeorm';
import { EstudianteXclase } from './entities/estudiante-xclase.entity';

  @Injectable()
  export class EstudianteXclaseService {
    private estudianteXclase:EstudianteXclase[] = [];
  
    constructor(
      @InjectRepository(EstudianteXclase)
      private readonly estudianteXclaseRepository:Repository<EstudianteXclase>
      ){}
  
      //'This action adds a new EstudianteXclase';
  
      async create(createEstudianteXclaseDto : CreateEstudianteXclaseDto) : Promise<boolean>{ 
        try{
            let estudianteXclase :EstudianteXclase = await this.estudianteXclaseRepository.save(new EstudianteXclase(CreateEstudianteXclaseDto.clase, CreateEstudianteXclaseDto.estudiante,));
            if(estudianteXclase)
               return true;
           else
               throw new Error('No se pudo crear estudianteXclase');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en estudianteXclase create - ' + error
            },HttpStatus.NOT_FOUND)
        }
    }
  
      // return `This action returns all EstudianteXclase`
      async findAllRaw():Promise<EstudianteXclase[]>{
        this.estudianteXclase = [];
        let datos = await this.estudianteXclaseRepository.query("select * from estudianteXclase");
  
        datos.forEach(element => {
            let estudianteXclase : EstudianteXclase = new EstudianteXclase(element.clase, element.estudiante);
            this.estudianteXclase.push(estudianteXclase)
        });
  
        return this.estudianteXclase;
    }
  
    async findAllOrm():Promise<EstudianteXclase[]>{
      return await this.estudianteXclaseRepository.find();
  }
  
  //`This action returns a #${id} EstudianteXclase`
  
  async findByEstudiante(estudiante:Estudiante) : Promise<EstudianteXclase> {
    try{
        const criterio : FindOneOptions = { where: { estudiante:Estudiante} };
        const estudianteXclase : EstudianteXclase = await this.estudianteXclaseRepository.findOne( criterio );
        if(estudianteXclase)
            return estudianteXclase
        else  
            throw new Error('No se encuentra estudianteXclase');
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error en asistencia find by estudianteXclase - ' + error
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
  
