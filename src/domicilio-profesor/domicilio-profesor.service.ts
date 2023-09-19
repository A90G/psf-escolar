
import { CreateDomicilioProfesorDto } from './dto/create-domicilio-profesor.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { DomicilioProfesor } from './entities/domicilio-profesor.entity';

@Injectable()

export class DomicilioProfesorService {

  private domicilioProfesor: DomicilioProfesor[] = []; // entendiendo que un profesor puede tener varios domicilios

  constructor(
    @InjectRepository(DomicilioProfesor)
    private readonly domicilioProfesorsRepository:Repository<DomicilioProfesor>
    ){}

    //'This action adds a new adressTeacher';

    async create (createDomicilioProfesorDto : CreateDomicilioProfesorDto) : Promise<boolean>{
      try{
        const domicilioProfesor = await this.domicilioProfesorsRepository.save(new DomicilioProfesor( 
          createDomicilioProfesorDto.domicilio, createDomicilioProfesorDto.ciudad, createDomicilioProfesorDto.profesor));
        if (domicilioProfesor) {
          return true;
        } else {
          throw new Error('No se pudo crear el nuevo domicilio');
        }
      }
      catch(error){
          throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: 'Error en el nuevo domicilio del create - ' + error
          },HttpStatus.NOT_FOUND)
      }
  }

//`This action returns all adressTeacher`

    async findAllRaw():Promise<DomicilioProfesor[]>{
      this.domicilioProfesor = [];
      let datos = await this.domicilioProfesorsRepository.query("select * from domicilioProfesor");

      datos.forEach(element => {
          let domicilioProfesor : DomicilioProfesor = new DomicilioProfesor[(element.domicilio, element.ciudad, element.profesor)];
          this.domicilioProfesor.push(domicilioProfesor)
      });

      return this.domicilioProfesor;
  }

  async findAllOrm():Promise<DomicilioProfesor[]>{
    return await this.domicilioProfesorsRepository.find();
}

//`This action returns a #${id} adressTeacher`

async findById(id :number) : Promise<DomicilioProfesor> {
  try{
      const criterio : FindOneOptions = { where: { id:id} };
      const domicilioProfesor : DomicilioProfesor = await this.domicilioProfesorsRepository.findOne( criterio );
      if(domicilioProfesor)
          return domicilioProfesor
      else  
          throw new Error('No se encuentra el domicilioProfesor');
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en el domicilioProfesor find by id - ' + error
      },HttpStatus.NOT_FOUND)
  }
}

// `This action updates a #${id} domicilioProfesor`;

async update(createDomicilioProfesorDto : CreateDomicilioProfesorDto, id:number) : Promise<string>{
  try{
      const criterio : FindOneOptions = { where : {id:id} };
      let domicilioProfesor : DomicilioProfesor = await this.domicilioProfesorsRepository.findOne(criterio);
      if(domicilioProfesor)
          throw new Error('no se pudo encontrar el domicilioProfesor a modificar ');
          const domicilioProfesorAntiguo = {
            domicilio: domicilioProfesor.getDomicilio(),
            ciudad: domicilioProfesor.getCiudad(),
            profesor: domicilioProfesor.getProfesor(),
          };
      
          if (createDomicilioProfesorDto.domicilio !== null && createDomicilioProfesorDto.domicilio !== undefined) {
            domicilioProfesor.setDomicilio(createDomicilioProfesorDto.domicilio);
          }       
          if (createDomicilioProfesorDto.domicilio !== null && createDomicilioProfesorDto.domicilio !== undefined) {
            domicilioProfesor.setDomicilio(createDomicilioProfesorDto.domicilio);
          } 
          if (createDomicilioProfesorDto.ciudad !== null && createDomicilioProfesorDto.ciudad !== undefined) {
            domicilioProfesor.setCiudad(createDomicilioProfesorDto.ciudad);
          } 
    
          domicilioProfesor = await this.domicilioProfesorsRepository.save(domicilioProfesor); // acá no tengo nombre por eso llamo el antiguo por domicilio o será mejor hacerlo diferente?
          return `OK el antiguo domicilio es: - ${domicilioProfesorAntiguo.domicilio} --> que fue corregido por ${createDomicilioProfesorDto.domicilio}, (${createDomicilioProfesorDto.ciudad}),(${createDomicilioProfesorDto.profesor})`;
      }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en domicilioProfesor update - ' + error
      },HttpStatus.NOT_FOUND)
  }
}


// `This action removes a #${id} domicilioProfesor`;

async delete(id:number): Promise<any>{
  try{
      const criterio : FindOneOptions = { where : {id:id} }
      let domicilioProfesor : DomicilioProfesor = await this.domicilioProfesorsRepository.findOne(criterio);
      if(domicilioProfesor)
          throw new Error('no se pudo eliminar escuela ');
      else{
          await this.domicilioProfesorsRepository.remove(domicilioProfesor);
          return { id:id,
                  message:'se elimino exitosamente domicilioProfesor'
              }
          }
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en domicilioProfesor delete - ' + error
      },HttpStatus.NOT_FOUND)
  }
}
}
