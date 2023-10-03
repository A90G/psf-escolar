import { CreateDomicilioEstudianteDto } from './dto/create-domicilio-estudiante.dto'; 
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { DomicilioEstudiante } from './entities/domicilio-estudiante.entity';

@Injectable()
export class DomicilioEstudianteService {

  private domicilioEstudiante:DomicilioEstudiante [] = [];

  constructor(
    @InjectRepository(DomicilioEstudiante)
    private readonly domicilioEstudianteRepository:Repository<DomicilioEstudiante>
    ){}

    //'This action adds a new DomicilioEstudiante';

    async create(createDomicilioEstudianteDto : CreateDomicilioEstudianteDto) : Promise<boolean>{
      try{
          let domicilioEstudiante:DomicilioEstudiante = await this.domicilioEstudianteRepository.save(new DomicilioEstudiante(createDomicilioEstudianteDto.domicilio, createDomicilioEstudianteDto.ciudad, createDomicilioEstudianteDto.estudiante));
          if(domicilioEstudiante)
             return true;
         else
             throw new Error('No se pudo crear el nuevo domicilioEstudiante');
      }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en Clase create - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }

    // return `This action returns all domicilioEstudiante`
    async findAllRaw():Promise<CreateDomicilioEstudianteDto []>{
      try {
        const datos = await this.domicilioEstudianteRepository.query("select * from DomicilioEstudiante");
        const CreateDomicilioEstudianteDto: CreateDomicilioEstudianteDto[] = [];
      for (const element of datos) {
        const domicilioEstudiante: CreateDomicilioEstudianteDto = {
          domicilio: element.domicilio,
          ciudad: element.ciudad,
          estudiante: element.estudiante,
        };
        CreateDomicilioEstudianteDto.push(domicilioEstudiante);
      }
    
      return CreateDomicilioEstudianteDto;
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

  async findAllOrm():Promise<DomicilioEstudiante[]>{
    return await this.domicilioEstudianteRepository.find();
}

//`This action returns a #${id} DomicilioEstudiante`

async findById(id :number) : Promise<CreateDomicilioEstudianteDto> {
  try{
      const criterio : FindOneOptions = { where: { id:id} };
      const domicilioEstudiante : DomicilioEstudiante = await this.domicilioEstudianteRepository.findOne( criterio );
      if (domicilioEstudiante) {
        const createDomicilioEstudianteDto: CreateDomicilioEstudianteDto = {
          domicilio: domicilioEstudiante.getDomicilio(),
          ciudad: domicilioEstudiante.getCiudad(),
          estudiante: domicilioEstudiante.getEstudiante(),
        };
        return createDomicilioEstudianteDto;
      } else {
        throw new Error('No se encuentra la clase');
      } 
    } catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en domicilioEstudiante find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

// `This action updates a #${id} domicilioEstudiante`;

  async update(createDomicilioEstudianteDto : CreateDomicilioEstudianteDto, id:number) : Promise<string>{
    try{
        const criterio : FindOneOptions = { where : {id:id} };
        let domicilioEstudiante : DomicilioEstudiante = await this.domicilioEstudianteRepository.findOne(criterio);
        if(!domicilioEstudiante)
            throw new Error('no se pudo encontrar el domicilioEstudiante a modificar ');
            const domicilioEstudianteAntiguo = {
              domicilio: domicilioEstudiante.getDomicilio(),
              ciudad: domicilioEstudiante.getCiudad(),
              estudiante: domicilioEstudiante.getEstudiante(),
            };
        
            if (createDomicilioEstudianteDto.domicilio !== null && createDomicilioEstudianteDto.domicilio !== undefined) {
              domicilioEstudiante.setDomicilio(createDomicilioEstudianteDto.domicilio);
            } 
                
            if (createDomicilioEstudianteDto.ciudad !== null && createDomicilioEstudianteDto.ciudad !== undefined) {
              domicilioEstudiante.setCiudad(createDomicilioEstudianteDto.ciudad);
            } 
                
            if (createDomicilioEstudianteDto.estudiante !== null && createDomicilioEstudianteDto.estudiante !== undefined) {
              domicilioEstudiante.setEstudiante(createDomicilioEstudianteDto.estudiante);
            } 
        
            domicilioEstudiante = await this.domicilioEstudianteRepository.save(domicilioEstudiante);
            return `OK - ${domicilioEstudianteAntiguo.domicilio} --> ${createDomicilioEstudianteDto.domicilio} (${createDomicilioEstudianteDto.ciudad}) (${createDomicilioEstudianteDto.estudiante})`;
        }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en domicilioEstudiante update - ' + error
        },HttpStatus.NOT_FOUND)
    }
}

// `This action removes a #${id} domicilioEstudiante`;

async delete(id:number): Promise<any>{
  try{
      const criterio : FindOneOptions = { where : {id:id} }
      let domicilioEstudiante : DomicilioEstudiante = await this.domicilioEstudianteRepository.findOne(criterio);
      if(!domicilioEstudiante)
          throw new Error('no se pudo eliminar DomicilioEstudiante ');
      else{
          await this.domicilioEstudianteRepository.remove(domicilioEstudiante);
          return { id:id,
                  message:'se elimino exitosamente domicilioEstudiante'
              }
          }
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en domicilioEstudiante delete - ' + error
      },HttpStatus.NOT_FOUND)
  }
  
}
}

