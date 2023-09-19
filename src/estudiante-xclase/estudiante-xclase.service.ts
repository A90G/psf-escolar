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
            let estudianteXclase :EstudianteXclase = await this.estudianteXclaseRepository.save(new EstudianteXclase(createEstudianteXclaseDto.clases, createEstudianteXclaseDto.estudiante,));
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
  
  async findById(claseId: number, estudianteId: number): Promise<EstudianteXclase> {
    try {
      const criterio: FindOneOptions = {
        where: {
          clase: { idClase: claseId },
          estudiante: { id: estudianteId },
        },
      };
        const estudianteXclase : EstudianteXclase = await this.estudianteXclaseRepository.findOne( criterio );
        if(estudianteXclase)
            return estudianteXclase
        else  
            throw new Error('No se encuentra estudianteXclase');
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error en  find by estudianteXclase - ' + error
        },HttpStatus.NOT_FOUND)
    }
  }
  
  // `This action updates a #${id} createEstudianteXclaseDto`;
  
  async update(
    createEstudianteXclaseDto: CreateEstudianteXclaseDto,
    claseId: number,
    estudianteId: number
  ): Promise<string> {
    try {
      const criterio: FindOneOptions = {
        where: { clase: { idClase: claseId }, estudiante: { id: estudianteId } },
      };
          let estudianteXclase : EstudianteXclase = await this.estudianteXclaseRepository.findOne(criterio);
          if(estudianteXclase)
              throw new Error('no se pudo encontrar la asistencia a modificar ');
              let antiguaEstudianteXclase = { 
                  clase: estudianteXclase.getClase(),
                  estudiante: estudianteXclase.getEstudiante()
              };
   
                if (createEstudianteXclaseDto.clases !== null && createEstudianteXclaseDto.clases !== undefined) {
                    estudianteXclase.setClase(createEstudianteXclaseDto.clases);
                } 
                if (createEstudianteXclaseDto.estudiante !== null && createEstudianteXclaseDto.estudiante !== undefined) {
                    estudianteXclase.setEstudiante(createEstudianteXclaseDto.estudiante);
                } 
  
                estudianteXclase = await this.estudianteXclaseRepository.save(estudianteXclase);
              return `OK - ${antiguaEstudianteXclase.clase} --> (${createEstudianteXclaseDto.clases}), (${createEstudianteXclaseDto.estudiante})`;
          }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en EstudianteXclase update - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }
  
  // `This action removes a #${id} asistencia`;
  async delete(claseId: number, estudianteId: number): Promise<any> {
    try {
      const criterio: FindOneOptions = {
        where: { clase: { idClase: claseId }, estudiante: { id: estudianteId } },
      };
  
      const estudianteXclase: EstudianteXclase = await this.estudianteXclaseRepository.findOne(
        criterio
      );
  
      if (!estudianteXclase) {
        throw new Error('No se pudo eliminar EstudianteXclase');
      }
  
      await this.estudianteXclaseRepository.remove(estudianteXclase);
  
      return {
        message: 'Se eliminó exitosamente EstudianteXclase',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en EstudianteXclase delete - ' + error,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }
  }
  
